import { Linking } from 'react-native';
import Rate from 'react-native-rate';

import UserDataSource from '../../data/UserDataSource';
import settings from '../../data/local-storage/content/settings';
import I18n from '../../utils/i18n/I18n';
import { URL, AppleId, AppPackageName } from '../../utils/utils/Constants';

const RateOptions = {
    AppleAppID: AppleId,
    GooglePackageName: AppPackageName,
    preferInApp: true,
    openAppStoreIfInAppFails: true
}

export default class SettingsPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    async loadData() {
        const user = await this.dataSource.getUser();
        const isPremium = !!user.subscriptionId;
        const premiumStatusText = isPremium ? I18n.t('status.active') :  I18n.t('status.inactive');
        const settingsUi = settings.map(item => ({
            id: item.id,
            title: I18n.t(`settings.option.${item.name}`),
            iconName: 'arrow-right-bold'
        }))
        const data = {
            isPremium,
            premiumStatusText,
            settings: settingsUi
        };
        if (this.view) {
            this.view.setData(data);
        }
    }

    unmountView() {
        this.view = null;
    }

    openSettings(id) {
        switch (id) {
            case 'appFeedback':
                Rate.rate(RateOptions);
                break;
            case 'aboutUs':
                this._openUrl(URL.AboutUs)
                break;
            case 'termsAndConditions':
                this._openUrl(URL.TermsAndConditions);
                break;
            case 'privacyPolicy':
                this._openUrl(URL.PrivacyPolicy);
                break;
            case 'billingTerms':
                this._openUrl(URL.BillingTerms);
                break;
            default:
                break;
        }
    }

    _openUrl(url) {
        try {
            Linking.openURL(url);
        } catch (error) {
            console.log(`_openUrl(): ${url}`, error);
        }
    }
}