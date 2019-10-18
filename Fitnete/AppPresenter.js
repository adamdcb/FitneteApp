import UserDataSource from './app/data/UserDataSource';
import { InitialStoryboard } from './app/utils/navigation/NavConstants';

export default class AppPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    async loadInitialStoryboard() {
        try {
            this.view.setInitialStoryboard(InitialStoryboard.AppIntro);
            // TODO: implement logic here!
        } catch (e) {
            this.view.setInitialStoryboard(InitialStoryboard.AppIntro);
        }
    }

    unmountView() {
        this.view = null;
    }
}