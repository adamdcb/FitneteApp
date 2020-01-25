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

    async loadData(tryRestore) {
        let duration = 0;
        let subscriptionsUi = [];
        let premium = false;
        try {
            const user = await this.userDataSource.getUser();
            this.subscriptions = await this._getSubscriptions();
            subscriptionsUi = this.subscriptions.map(subscription => {
                const type = this._getSubscriptionType(subscription.id);
                const noOfWeeks = this._getNumberOfWeeks(subscription.id);
                const pricePerWeek = subscription.price / noOfWeeks;
                return {
                    id: subscription.id,
                    type,
                    price: subscription.price,
                    title: `${I18n.t(`purchase.title.${type}`)}`.toUpperCase(),
                    description: `${I18n.t(`purchase.description.${type}`)}`,
                    priceText: noOfWeeks > 1 ? `${subscription.localizedPrice}/${I18n.t(`purchase.subscriptionPeriod.${type}`)}` : ' ',
                    pricePerWeekText: `${subscription.currency} ${pricePerWeek.toFixed(2)}/${I18n.t('purchase.subscriptionPeriod.week')}`
                }
            })
                .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            this.selectedSubscription = this.subscriptions.find(s => s.id === (subscriptionsUi[0] || {}).id);
            duration = WorkoutDataManager.PROGRAM_SLICE[user.fitnessLevel].length * 7;
            if (tryRestore) {
                premium = await this._restorePurchasesIfPossible();
            } else {
                await WorkoutDataManager.prepareWorkouts();
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (this.view) {
                this.view.setData({
                    subscriptions: subscriptionsUi,
                    activeSubscriptionType: this._getSubscriptionType((this.selectedSubscription || {}).id),
                    workoutsTotal: duration,
                    workoutsPerWeek: 4, // TODO
                    premium,
                    loading: false
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
        const subscriptions = await IAPService.getAvailableSubscriptions();
        if (!subscriptions.find(s => s.productId === this.selectedSubscription.id)) {
            IAPService.requestSubscription(this.selectedSubscription.id);
        } else {
            const premium = await this._restorePurchasesIfPossible(subscriptions);
            if (premium && this.view) {
                this.view.onSubscriptionSuccess();
            }
        }
    }

    async onPurchaseUpdateSuccess(purchase) {
        if (purchase.productId !== this.selectedSubscription.id) {
            return;
        }
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
            this.view.setData({ paymentLoading: false });
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

    async _restorePurchasesIfPossible(purchases) {
        let premium = false;
        try {
            const subscriptions = purchases || await IAPService.getAvailableSubscriptions();
            premium = subscriptions.length > 0;
            let subscriptionId = null;
            if (premium) {
                const lastIndex = subscriptions.length - 1; // TODO: Is this right?
                subscriptionId = subscriptions[lastIndex].productId;
            }
            await this.userDataSource.setUser({
                subscriptionId
            });
            await WorkoutDataManager.prepareWorkouts();
        } catch (error) {
            console.log('_restorePurchasesIfPossible()', error);
        } finally {
            return premium;
        }
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

    _getNumberOfWeeks(subscriptionId) {
        if (subscriptionId.includes('year')) {
            return 52;
        }
        return 1;
    }
}