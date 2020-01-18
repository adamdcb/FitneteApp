import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';

const VERIFY_RECEIPT_URL = `https://get-in-app.com/verify/${Platform.OS.toLowerCase()}`;
const subscriptionIds = Platform.select({
    ios: [
        'com.fitnete.subscription.year',
        'com.fitnete.subscription.month',
        'com.fitnete.subscription.week'
    ],
    android: [
        'com.fitnete.subscription.year.v2',
        'com.fitnete.subscription.month.v2',
        'com.fitnete.subscription.week.v2'
    ]
});

const ERROR = {
    UNKNOWN: 'ERR_UNKNOWN',
    USER_CANCELLED: 'ERR_USER_CANCELLED',
    RECEIPT_VERIFY_FAILED: 'ERR_RECEIPT_VERIFY_FAILED'
}

let subscribers = [];

export default {
    ERROR,

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
                        s.onPurchaseUpdateError(RECEIPT_VERIFY_FAILED);
                    }
                });
            }
        });

        this.purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
            console.log('purchaseErrorListener', error);
            const errorCode = this.parseError(error);
            subscribers.forEach(s => {
                if (s.onPurchaseUpdateError) {
                    s.onPurchaseUpdateError(errorCode);
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
        let subscriptions = [];
        let availablePurchases = [];
        if (Platform.OS === 'android') {
            availablePurchases = await this.getAvailablePurchasesAndroid();
        } else if (Platform.OS === 'ios') {
            availablePurchases = await this.getAvailablePurchasesIOS();
        }
        for (let index = 0; index < availablePurchases.length; index++) {
            const purchase = availablePurchases[index];
            const isValid = await this.verifyReceipt(purchase.transactionReceipt);
            if (isValid) {
                try {
                    await RNIap.finishTransaction(purchase, false);
                } catch { }
                subscriptions.push(purchase);
            }
        }
        return subscriptions;
    },

    async getAvailablePurchasesAndroid() {
        try {
            const availablePurchases = await RNIap.getAvailablePurchases();
            return availablePurchases.filter(purchase => subscriptionIds.includes(purchase.productId));
        } catch (error) {
            console.log('getAvailablePurchasesAndroid()', error);
            return [];
        }
    },

    async getAvailablePurchasesIOS() {
        // TODO
        return [];
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
    },

    parseError(error) {
        switch (error.code) {
            case RNIap.IAPErrorCode.E_USER_CANCELLED:
                return ERROR.USER_CANCELLED;
            default:
                return ERROR.UNKNOWN;
        }
    }
}