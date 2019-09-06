import AsyncStorage from '@react-native-community/async-storage';

export default class AppIntroPresenter {
    constructor(view) {
        this.view = view;
    }

    getData() {
        const data = [
            {
                id: '1',
                imageName: 'Placeholder One',
                title: 'appIntro.page1Title',
                description: 'appIntro.page1Description'
            },
            { 
                id: '2',
                imageName: 'Placeholder Two',
                title: 'appIntro.page2Title',
                description: 'appIntro.page2Description'
            },
            {
                id: '3',
                imageName: 'Placeholder Three',
                title: 'appIntro.page3Title',
                description: 'appIntro.page3Description'
            }
        ]
        return data;
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