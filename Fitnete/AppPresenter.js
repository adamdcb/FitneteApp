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
            const user = await this.dataSource.getUser();
            if (user && user.subscriptionId) {
                this.view.setInitialStoryboard(InitialStoryboard.MainApp);
            } else {
                this.view.setInitialStoryboard(InitialStoryboard.AppIntro);
            }
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