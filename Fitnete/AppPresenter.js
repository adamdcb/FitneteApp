import UserDataSource from './app/data/UserDataSource';
import { InitialStoryboard } from './app/utils/navigation/NavConstants';
import FNDatabase from './app/data/local-storage/FNDatabase';
import NotificationService from './app/utils/notifications/NotificationService';
import IAPService from './app/utils/iap/IAPService';

export default class AppPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    async init() {
        await FNDatabase.open();
        NotificationService.init();
        IAPService.init();
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
        IAPService.deinit();
        NotificationService.deinit();
        this.view = null;
    }
}