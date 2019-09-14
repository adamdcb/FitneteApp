import UserDataSource from './app/data/UserDataSource';
import { InitialStoryboard } from './app/utils/navigation/NavConstants';

export default class AppPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    async loadInitialStoryboard() {
        try {
            const user = await this.dataSource.getUser();
            if (user === null || !user.didAcceptTerms) {
                this.view.setInitialStoryboard(InitialStoryboard.AppIntro);
            } else if (!user.profile) {
                this.view.setInitialStoryboard(InitialStoryboard.UserDataInput);
            } else {
                // TODO: implement logic here!
                this.view.setInitialStoryboard(InitialStoryboard.UserDataInput);
            }
        } catch (e) {
            this.view.setInitialStoryboard(InitialStoryboard.AppIntro);
        }
    }

    unmountView() {
        this.view = null;
    }
}