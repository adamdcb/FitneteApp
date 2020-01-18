import { Linking } from 'react-native';
import UserDataSource from '../data/UserDataSource';

const URL = {
    TermsAndConditions: 'https://www.fitnete.com/terms-of-service',
    PrivacyPolicy: 'https://www.fitnete.com/privacypolicy'
};
const NO_OF_SLIDES = 3;

export default class AppIntroPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    getData() {
        return Array.from({ length: NO_OF_SLIDES }).map((value, index) => {
            const page = index + 1;
            return {
                id: `${page}`,
                imageName: `exercise_${page}`,
                title: `appIntro.page${page}Title`,
                description: `appIntro.page${page}Description`
            }
        });
    }

    async didTapTermsAndConditions() {
        try {
            Linking.openURL(URL.TermsAndConditions)
        } catch (error) {
            console.log('didTapTermsAndConditions()', error);
        }
    }

    async didTapPrivacyPolicy() {
        try {
            Linking.openURL(URL.PrivacyPolicy)
        } catch (error) {
            console.log('didTapPrivacyPolicy()', error);
        }
    }

    async didAcceptTerms() {
        const data = {
            termsAccepted: true
        };
        const success = await this.dataSource.setUser(data);
        if (success) {
            this.view.didAcceptTerms();
        }
    }

    unmountView() {
        this.view = null;
    }
}