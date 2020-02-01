import { Platform } from 'react-native';
import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';
import IAPService from '../../utils/iap/IAPService';
import WorkoutDataManager from '../../data/WorkoutDataManager';
import SubscriptionManager from '../../utils/iap/SubscriptionManager';

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
        try {
            const user = await this.userDataSource.getUser();
            this.subscriptions = await this._getSubscriptions();
            const subscriptionsUi = this.subscriptions.map(subscription => {
                const type = this._getSubscriptionType(subscription.id);
                const noOfWeeks = this._getNumberOfWeeks(subscription.id);
                const pricePerWeekRaw = subscription.price / noOfWeeks;
                const pricePerWeek = Math.ceil((pricePerWeekRaw + Number.EPSILON) * 100) / 100;
                return {
                    id: subscription.id,
                    type,
                    price: subscription.price,
                    title: `${I18n.t(`purchase.title.${type}`)}`.toUpperCase(),
                    description: `${I18n.t(`purchase.description.${type}`)}`,
                    priceText: noOfWeeks > 1 ? `${subscription.localizedPrice}/${I18n.t(`purchase.subscriptionPeriod.${type}`)}` : ' ',
                    pricePerWeekText: `${subscription.currency} ${pricePerWeek}/${I18n.t('purchase.subscriptionPeriod.week')}`
                }
            })
                .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            this.selectedSubscription = this.subscriptions.find(s => s.id === (subscriptionsUi[0] || {}).id);
            const duration = WorkoutDataManager.PROGRAM_SLICE[user.fitnessLevel].length * 7;
            const workoutsPerWeek = WorkoutDataManager.WORKOUTS_PER_WEEK[user.fitnessLevel];
            if (this.view) {
                this.view.setData({
                    subscriptions: subscriptionsUi,
                    activeSubscriptionType: this._getSubscriptionType((this.selectedSubscription || {}).id),
                    workoutsTotal: duration,
                    workoutsPerWeek,
                    error: null
                });
            }
        } catch (error) {
            console.log(error);
            const errorUi = {
                title: I18n.t('error.title'),
                message: I18n.t('error.unknownError')
            }
            switch (error) {
                case IAPService.ERROR.NETWORK_ERROR:
                    errorUi.message = I18n.t('error.networkError');
                    break;
                default:
                    break;
            }
            if (this.view) {
                this.view.setData({
                    error: errorUi
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

    requestSubscription() {
        console.log(this.selectedSubscription.id);
        IAPService.requestSubscription(this.selectedSubscription.id);
    }

    async restoreSubscription() {
        const response = await SubscriptionManager.checkSubscriptionStatus();
        if (!this.view) {
            return;
        }
        if (response.error !== null) {
            this.onPurchaseUpdateError(response.error);
        } else if (response.premium) {
            this.view.onSubscriptionSuccess();
        } else {
            this.view.onSubscriptionError({
                title: I18n.t('error.title'),
                message: I18n.t('error.noSubscriptionsFound')
            });
        }
    }

    async onPurchaseUpdateSuccess(purchase) {
        if (purchase.productId !== this.selectedSubscription.id) {
            return;
        }
        await SubscriptionManager.saveSubscription(purchase.productId);
        if (this.view) {
            this.view.onSubscriptionSuccess();
        }
    }

    async onPurchaseUpdateError(errorCode) {
        if (!this.view) {
            return;
        }
        switch (errorCode) {
            case IAPService.ERROR.USER_CANCELLED:
                this.view.setData({ paymentLoading: false });
                break;
            case IAPService.ERROR.ALREADY_OWNED:
                await SubscriptionManager.saveSubscription(this.selectedSubscription.id);
                if (this.view) {
                    this.view.onSubscriptionSuccess();
                }
                break;
            case IAPService.ERROR.NETWORK_ERROR:
                this.view.onSubscriptionError({
                    title: I18n.t('error.title'),
                    message: I18n.t('error.networkError')
                });
                break;
            default:
                this.view.onSubscriptionError({
                    title: I18n.t('error.title'),
                    message: I18n.t('error.unknownError')
                });
                break;
        }
    }

    unmountView() {
        IAPService.unsubscribe(this);
        this.view = null;
    }

    async _getSubscriptions() {
        try {
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
        } catch (error) {
            throw error;
        }

    }

    _getSubscriptionType(subscriptionId) {
        if (!subscriptionId) {
            return '';
        }
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