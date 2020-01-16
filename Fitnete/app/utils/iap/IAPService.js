import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';

const VERIFY_RECEIPT_URL = `https://get-in-app.com/verify/${Platform.OS.toLowerCase()}`;
const subscriptionIds = Platform.select({
    ios: [
        'com.fitnete.subscription.year',
        'com.fitnete.subscription.month'
    ],
    android: [
        'com.fitnete.subscription.year.v2',
        'com.fitnete.subscription.month.v2'
    ]
});

let subscribers = [];

export default {
    async init() {
        this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase) => {
            const receipt = purchase.transactionReceipt;
            console.log('Receipt:', receipt);
            const success = await this.verifyReceipt(receipt);
            if (success) {
                await RNIap.finishTransaction(purchase, false);
                subscribers.forEach(s => {
                    if (s.onPurchaseUpdateSuccess) {
                        s.onPurchaseUpdateSuccess();
                    }
                });
            } else {
                subscribers.forEach(s => {
                    if (s.onPurchaseUpdateError) {
                        s.onPurchaseUpdateError();
                    }
                });
            }
        });

        this.purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
            console.log('purchaseErrorListener', error);
            subscribers.forEach(s => {
                if (s.onPurchaseUpdateError) {
                    s.onPurchaseUpdateError();
                }
            });
        });
    },

    async deinit() {
        if (this.purchaseUpdateSubscription) {
            this.purchaseUpdateSubscription.remove();
            this.purchaseUpdateSubscription = null;
        }
        if (this.purchaseErrorSubscription) {
            this.purchaseErrorSubscription.remove();
            this.purchaseErrorSubscription = null;
        }
    },

    subscribe(subscriber) {
        if (!subscribers.includes(subscriber)) {
            subscribers.push(subscriber);
        }
    },

    unsubscribe(subscriber) {
        subscribers = subscribers.filter(s => s !== subscriber);
    },

    async getAllSubscriptions() {
        try {
            const subscriptions = await RNIap.getSubscriptions(subscriptionIds);
            return subscriptions;
        } catch (error) {
            console.log('getAllSubscriptions()', error);
        }
    },

    async requestSubscription(subscriptionId) {
        try {
            await RNIap.requestSubscription(subscriptionId);
        } catch (error) {
            console.log('requestSubscription()', error);
        }
    },

    async getAvailableSubscriptions() {
        const subscriptions = [];
        try {
            let availablePurchases = await RNIap.getAvailablePurchases();
            availablePurchases = availablePurchases.filter(purchase => subscriptionIds.includes(purchase.productId));
            for (let index = 0; index < availablePurchases.length; index++) {
                const purchase = availablePurchases[index];
                const isValid = await this.verifyReceipt(purchase.transactionReceipt);
                if (isValid) {
                    subscriptions.push(purchase);
                }
            }
            return subscriptions;
        } catch (error) {
            console.log('getAvailableSubscriptions()', error);
            return subscriptions;
        }
    },

    async verifyReceipt(receipt) {
        try {
            const headers = new Headers();
            headers.append('Authorization', 'Basic dmFsaWRhdG9yOjFmY2ZiYjFlNDcwMjQwMTE4ZWNjZmM4YmM3NjUzZWVm');
            const response = await fetch(VERIFY_RECEIPT_URL,
                {
                    method: 'post',
                    headers,
                    body: receipt
                });
            console.log('VERIFY_RECEIPT_URL', response);
            return response.ok;
        } catch (error) {
            console.log('Verify receipt error', error);
            return false;
        }
    }
}