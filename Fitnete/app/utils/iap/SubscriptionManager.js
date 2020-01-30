import IAPService from './IAPService';
import UserDataSource from '../../data/UserDataSource';

export default {
    async checkSubscriptionStatus() {
        const userDataSource = new UserDataSource();
        let premium = false;
        try {
            const subscriptions = await IAPService.getAvailableSubscriptions();
            premium = subscriptions.length > 0;
            let subscriptionId = null;
            if (premium) {
                const lastIndex = subscriptions.length - 1; // TODO: Is this right?
                subscriptionId = subscriptions[lastIndex].productId;
            }
            await userDataSource.setUser({
                subscriptionId
            });
        } catch (error) {
            console.log('checkSubscriptionStatus()', error);
        } finally {
            return premium;
        }
    }
}