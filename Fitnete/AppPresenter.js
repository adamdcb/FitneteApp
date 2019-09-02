import AsyncStorage from '@react-native-community/async-storage';
import { InitialStoryboard } from './app/utils/navigation/NavConstants';

export default class AppPresenter {
    constructor(view) {
        this.view = view;
    }

    async loadInitialStoryboard() {
        try {
            const userStatus = await AsyncStorage.getItem('Fitnete.user.status.key')
            if (userStatus === null) {
                this.view.setInitialStoryboard(InitialStoryboard.Onboarding);
            } else {
                // TODO: implement logic here!
                this.view.setInitialStoryboard(InitialStoryboard.Onboarding);
            }
          } catch(e) {
            this.view.setInitialStoryboard(InitialStoryboard.Onboarding);
          }
    }

    unmountView() {
        this.view = null;
    }
}