import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';

const VERIFY_RECEIPT_URL = `https://get-in-app.com/verify/${Platform.OS.toLowerCase()}`;
const subscriptionIds = Platform.select({
    ios: [
        'com.fitnete.subscription.year',
        'com.fitnete.subscription.week'
    ],
    android: [
        'com.fitnete.subscription.year.v2',
        'com.fitnete.subscription.week.v2'
    ]
});

const ERROR = {
    UNKNOWN: 'ERR_UNKNOWN',
    USER_CANCELLED: 'ERR_USER_CANCELLED',
    NETWORK_ERROR: 'ERR_NETWORK_ERROR',
    ALREADY_OWNED: 'ERR_ALREADY_OWNED',
    RECEIPT_VERIFY_FAILED: 'ERR_RECEIPT_VERIFY_FAILED'
}

const subscribers = new Set();

export default {
    ERROR,

    async init() {
        this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase) => {
            const receipt = purchase.transactionReceipt;
            console.log('Receipt:', receipt);
            try {
                const success = await this.verifyReceipt(receipt);
                if (success) {
                    await RNIap.finishTransaction(purchase, false);
                    subscribers.forEach(s => {
                        if (s.onPurchaseUpdateSuccess) {
                            s.onPurchaseUpdateSuccess(purchase);
                        }
                    });
                } else {
                    subscribers.forEach(s => {
                        if (s.onPurchaseUpdateError) {
                            s.onPurchaseUpdateError(ERROR.RECEIPT_VERIFY_FAILED);
                        }
                    });
                }
            } catch (error) {
                subscribers.forEach(s => {
                    if (s.onPurchaseUpdateError) {
                        s.onPurchaseUpdateError(ERROR.RECEIPT_VERIFY_FAILED);
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
        subscribers.add(subscriber);
    },

    unsubscribe(subscriber) {
        subscribers.delete(subscriber);
    },

    async getAllSubscriptions() {
        try {
            const subscriptions = await RNIap.getSubscriptions(subscriptionIds);
            return subscriptions;
        } catch (error) {
            console.log('getAllSubscriptions()', error);
            const errorCode = this.parseError(error);
            throw errorCode;
        }
    },

    async requestSubscription(subscriptionId) {
        try {
            await RNIap.requestSubscription(subscriptionId, false);
        } catch (error) {
            console.log('requestSubscription()', error);
        }
    },

    async getAvailableSubscriptions() {
        try {
            const subscriptions = [];
            let availablePurchases = await RNIap.getAvailablePurchases();
            availablePurchases = availablePurchases.filter(purchase => subscriptionIds.includes(purchase.productId));
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
        } catch (error) {
            const errorCode = this.parseError(error);
            throw errorCode;
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
                    body: Platform.select({
                        ios: {
                            environment: 'sandbox', // FIXME
                            receipt_data: receipt
                        },
                        android: receipt
                    })
                });
            console.log('VERIFY_RECEIPT_URL', response);
            return response.ok;
        } catch (error) {
            console.log('Verify receipt error', error);
            throw {
               code: RNIap.IAPErrorCode.E_NETWORK_ERROR
            };
        }
    },

    parseError(error) {
        if (!error) {
            return ERROR.UNKNOWN;
        }
        console.log('parseError:', JSON.stringify(error));
        switch (error.code) {
            case RNIap.IAPErrorCode.E_NETWORK_ERROR:
            case RNIap.IAPErrorCode.E_SERVICE_ERROR:
                return ERROR.NETWORK_ERROR;
            case RNIap.IAPErrorCode.E_ALREADY_OWNED:
                return ERROR.ALREADY_OWNED;
            case RNIap.IAPErrorCode.E_USER_CANCELLED:
                return ERROR.USER_CANCELLED;
            default: {
                const errorMessage = (error.message || '').toLowerCase();
                if (errorMessage.includes('cannot connect')
                    || errorMessage.includes('internet connection appears to be offline')) {
                    return ERROR.NETWORK_ERROR;
                }
                return ERROR.UNKNOWN;
            }
        }
    }
}