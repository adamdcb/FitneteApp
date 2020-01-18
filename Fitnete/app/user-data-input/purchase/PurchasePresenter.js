import { Platform } from 'react-native';
import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';
import IAPService from '../../utils/iap/IAPService';
import WorkoutDataManager from '../../data/WorkoutDataManager';

const SUBSCRIPTION_TYPE = {
    week: 'week',
    month: 'month',
    year: 'year'
}

export default class PurchasePresenter {
    constructor(view) {
        this.view = view;
        this.userDataSource = new UserDataSource();
        this.selectedSubscription = null;
        IAPService.subscribe(this);
    }

    async loadData() {
        let duration = 0;
        let subscriptionsUi = [];
        try {
            const user = await this.userDataSource.getUser();
            this.subscriptions = await this._getSubscriptions();
            subscriptionsUi = this.subscriptions.map(subscription => {
                return {
                    id: subscription.id,
                    type: this._getSubscriptionType(subscription.subscriptionPeriod),
                    price: subscription.price,
                    title: subscription.title,
                    description: subscription.description,
                    fullDescription: I18n.t('purchase.fullDescription'),
                    priceText: `${subscription.localizedPrice} / ${I18n.t(`purchase.subscriptionPeriod.${subscription.subscriptionPeriod}`)}`,
                    trialTitle: I18n.t(`purchase.trialTitle.${subscription.freeTrialPeriod}`),
                    trialDescription: I18n.t(`purchase.trialDescription.${subscription.freeTrialPeriod}`)
                }
            })
                .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            this.selectedSubscription = this.subscriptions.find(s => this._getSubscriptionType(s.subscriptionPeriod) === (subscriptionsUi[0] || {}).type);
            duration = WorkoutDataManager.PROGRAM_SLICE[user.fitnessLevel].length * 7;
        } catch (error) {
            console.log(error);
        } finally {
            if (this.view) {
                this.view.setData({
                    subscriptions: subscriptionsUi,
                    activeSubscriptionType: this._getSubscriptionType((this.selectedSubscription || {}).subscriptionPeriod),
                    workoutsTotal: duration,
                    workoutsPerWeek: 4 // TODO
                });
            }
        }
    }

    setSelectedSubscription(subscriptionId) {
        this.selectedSubscription = this.subscriptions.find(s => s.id === subscriptionId);
        this.view.setData({
            activeSubscriptionType: this._getSubscriptionType((this.selectedSubscription || {}).subscriptionPeriod)
        });
    }

    async requestSubscription() {
        console.log(this.selectedSubscription.id);
        IAPService.requestSubscription(this.selectedSubscription.id);
    }

    async onPurchaseUpdateSuccess() {
        await WorkoutDataManager.prepareWorkouts(true);
        if (this.view) {
            this.view.onSubscriptionSuccess();
        }
    }

    onPurchaseUpdateError(errorCode) {
        if (!this.view) {
            return;
        }
        if (errorCode === IAPService.ERROR.USER_CANCELLED) {
            this.view.setData({ loading: false });
            return;
        }
        const errorTitle = '';
        const errorMessage = I18n.t('purchase.errorUnknowMessage');
        this.view.onSubscriptionError(errorTitle, errorMessage);
    }

    unmountView() {
        IAPService.unsubscribe(this);
        this.view = null;
    }

    async _getSubscriptions() {
        const storeSubscriptions = await IAPService.getAllSubscriptions();
        return storeSubscriptions.map(subscription => {
            const subscriptionPeriod = Platform.select({
                ios: subscription.subscriptionPeriodUnitIOS,
                android: subscription.subscriptionPeriodAndroid
            })
            const freeTrialPeriod = Platform.select({
                ios: subscription.introductoryPriceSubscriptionPeriodIOS,
                android: subscription.freeTrialPeriodAndroid
            })
            return {
                ...subscription,
                id: subscription.productId,
                subscriptionPeriod,
                freeTrialPeriod
            }
        });
    }

    _getSubscriptionType(period) {
        switch (period) {
            case 'P1W':
            case 'WEEK':
                return SUBSCRIPTION_TYPE.week;
            case 'P1M':
            case 'MONTH':
                return SUBSCRIPTION_TYPE.month;
            case 'P1Y':
            case 'YEAR':
                return SUBSCRIPTION_TYPE.year;
            default:
                return SUBSCRIPTION_TYPE.year;
        }
    }
}