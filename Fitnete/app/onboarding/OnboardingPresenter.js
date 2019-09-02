import AsyncStorage from '@react-native-community/async-storage';

export default class OnboardingPresenter {
    constructor(view) {
        this.view = view;
    }

   didAcceptTerms() {
        // try {
        //     const userStatus = await AsyncStorage.getItem('Fitnete.user.status.key')
        //     if (userStatus === null) {
        //         this.view.setInitialStoryboard(InitialStoryboard.Onboarding);
        //     } else {
        //         // TODO: implement logic here!
        //         this.view.setInitialStoryboard(InitialStoryboard.Onboarding);
        //     }
        //   } catch(e) {
        //     this.view.setInitialStoryboard(InitialStoryboard.Onboarding);
        //   }
    }

    unmountView() {
        this.view = null;
    }
}