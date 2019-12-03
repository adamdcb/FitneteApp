import UserDataSource from './app/data/UserDataSource';
import { InitialStoryboard } from './app/utils/navigation/NavConstants';
import FNDatabase from './app/data/local-storage/FNDatabase';

export default class AppPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    async openDatabse() {
        await FNDatabase.open();
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