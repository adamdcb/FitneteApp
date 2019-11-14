import UserDataSource from '../../data/UserDataSource';
import settings from '../../data/local-storage/content/settings';
import I18n from '../../utils/i18n/I18n';

export default class SettingsPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    async loadData() {
        // const user = await this.dataSource.getUser();
        const data = settings.map(item => ({
            id: item.id,
            title: I18n.t(`settings.option.${item.name}`),
            iconName: 'arrow-right-bold'
        }))
        if (this.view) {
            this.view.setData(data);
        }
    }

    unmountView() {
        this.view = null;
    }
}