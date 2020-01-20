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
                const type = this._getSubscriptionType(subscription.id);
                return {
                    id: subscription.id,
                    type,
                    price: subscription.price,
                    title: subscription.title,
                    description: subscription.description,
                    fullDescription: I18n.t('purchase.fullDescription'),
                    priceText: `${subscription.localizedPrice} / ${I18n.t(`purchase.subscriptionPeriod.${type}`)}`,
                    trialTitle: I18n.t(`purchase.trialTitle.${subscription.freeTrialPeriod}`),
                    trialDescription: I18n.t(`purchase.trialDescription.${subscription.freeTrialPeriod}`)
                }
            })
                .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            this.selectedSubscription = this.subscriptions.find(s => s.id === (subscriptionsUi[0] || {}).id);
            duration = WorkoutDataManager.PROGRAM_SLICE[user.fitnessLevel].length * 7;
        } catch (error) {
            console.log(error);
        } finally {
            if (this.view) {
                this.view.setData({
                    subscriptions: subscriptionsUi,
                    activeSubscriptionType: this._getSubscriptionType((this.selectedSubscription || {}).id),
                    workoutsTotal: duration,
                    workoutsPerWeek: 4 // TODO
                });
            }
        }
    }

    setSelectedSubscription(subscriptionId) {
        this.selectedSubscription = this.subscriptions.find(s => s.id === subscriptionId);
        this.view.setData({
            activeSubscriptionType: this._getSubscriptionType((this.selectedSubscription || {}).id)
        });
    }

    async requestSubscription() {
        console.log(this.selectedSubscription.id);
        IAPService.requestSubscription(this.selectedSubscription.id);
    }

    async onPurchaseUpdateSuccess(purchase) {
        await this.userDataSource.setUser({
            subscriptionId: purchase.productId
        });
        await WorkoutDataManager.prepareWorkouts();
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
            const freeTrialPeriod = Platform.select({
                ios: subscription.introductoryPriceSubscriptionPeriodIOS,
                android: subscription.freeTrialPeriodAndroid
            })
            return {
                ...subscription,
                id: subscription.productId,
                freeTrialPeriod: this._getPeriodType(freeTrialPeriod)
            }
        });
    }

    _getSubscriptionType(subscriptionId) {
        if (subscriptionId.includes('week')) {
            return SUBSCRIPTION_TYPE.week;
        }
        if (subscriptionId.includes('month')) {
            return SUBSCRIPTION_TYPE.month;
        }
        return SUBSCRIPTION_TYPE.year;
    }

    _getPeriodType(period) {
        switch (period) {
            case 'WEEK':
            case 'P1W':
                return 'week';
            default:
                return '';
        }
    }
}