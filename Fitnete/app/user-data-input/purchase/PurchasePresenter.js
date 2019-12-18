import I18n from '../../utils/i18n/I18n';
import TrainingDataSource from '../../data/TrainingDataSource';

const SUBSCRIPTION_TYPE = {
    month: 'month',
    year: 'year'
}

export default class PurchasePresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new TrainingDataSource();
        this.selectedSubscriptionType = SUBSCRIPTION_TYPE.year;
    }

    async loadData() {
        const monthSubscription = {
            type: SUBSCRIPTION_TYPE.month,
            priceText: `$10.99 / ${I18n.t('month')}`,
            pricePerYearText: '',
            trialTitle: I18n.t('purchase.trialTitle'),
            trialDescription: I18n.t('purchase.trialDescription')
        };
        const yearSubscription = {
            type: SUBSCRIPTION_TYPE.year,
            priceText: `$8.99 / ${I18n.t('month')}`,
            pricePerYearText: `${I18n.t('purchase.pricePerYear', { price: 107.88 })}`,
            trialTitle: I18n.t('purchase.trialTitle'),
            trialDescription: I18n.t('purchase.trialDescription')
        };
        let duration = 0;
        try {
            duration = await this.dataSource.getAnyProgramDuration();
        } catch (error) {
            console.log(error);
        } finally {
            if (this.view) {
                this.view.setData({
                    subscriptions: [monthSubscription, yearSubscription],
                    activeSubscriptionType: this.selectedSubscriptionType,
                    workoutsTotal: duration,
                    workoutsPerWeek: 4 // TODO
                });
            }
        }
    }

    setSelectedSubscriptionType(type) {
        this.selectedSubscriptionType = type;
        this.view.setData({
            activeSubscriptionType: this.selectedSubscriptionType
        });
    }

    unmountView() {
        this.view = null;
    }
}