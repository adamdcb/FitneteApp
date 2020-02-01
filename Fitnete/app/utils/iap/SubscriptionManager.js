import IAPService from './IAPService';
import UserDataSource from '../../data/UserDataSource';

const subscriptions = new Set();

export default {
    async checkSubscriptionStatus() {
        try {
            const subscriptions = await IAPService.getAvailableSubscriptions();
            const premium = subscriptions.length > 0;
            let subscriptionId = null;
            if (premium) {
                const lastIndex = subscriptions.length - 1; // TODO: Is this right?
                subscriptionId = subscriptions[lastIndex].productId;
            }
            await this.saveSubscription(subscriptionId);
            return {
                premium,
                error: null
            };
        } catch (error) {
            console.log('checkSubscriptionStatus()', error);
            return {
                premium: false,
                error
            };
        }
    },

    async saveSubscription(subscriptionId) {
        try {
            const userDataSource = new UserDataSource();
            const user = await userDataSource.getUser();
            const subscriptionHasChanged = subscriptionId !== user.subscriptionId;
            await userDataSource.setUser({
                subscriptionId
            });
            if (subscriptionHasChanged) {
                subscriptions.forEach((s) => {
                    if (s.onSubscriptionUpdate) {
                        s.onSubscriptionUpdate(!!subscriptionId);
                    }
                });
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    subscribe(subscriber) {
        subscriptions.add(subscriber);
    },

    unsubscribe(subscriber) {
        subscriptions.delete(subscriber);
    },
}