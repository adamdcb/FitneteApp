import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';
import areasOfFocus from '../../data/local-storage/content/areasOfFocus';

export default class AreaOfFocusPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
        this.data = {};
    }

    async loadData() {
        const data = this._getDefaultData();
        const user = await this.dataSource.getUser();
        const { gender } = user;
        if (gender) {
            data.selectedGroupIndex = data.groups.findIndex(g => g.type === gender)
        } else {
            this._init(data);
        }
        this.data = data;
        this.view.setTabViewData(this.data);
    }

    async didSelectGroup(index) {
        if (this.data.selectedGroupIndex === index) {
            return;
        }
        this.data.selectedGroupIndex = index;
        const data = {
            gender: this.data.groups[index].type
        };
        this.view.setTabViewData(this.data);
        this.dataSource.setUser(data);
    }

    unmountView() {
        this.view = null;
    }

    async _init(data) {
        const initialData = {
            gender: data.groups[data.selectedGroupIndex].type
        };
        this.dataSource.setUser(initialData);
    }

    _getDefaultData() {
        const data = {
            selectedGroupIndex: 0,
            groups: areasOfFocus.map((item) => ({
                id: item.id,
                type: item.type,
                name: I18n.t(`areasOfFocus.${item.type}`)
            }))
        };
        return data;
    }
}
