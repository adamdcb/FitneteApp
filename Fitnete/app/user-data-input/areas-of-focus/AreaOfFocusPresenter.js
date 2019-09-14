import I18n from '../../utils/i18n/I18n';

export default class AreaOfFocusPresenter {
    constructor(view) {
        this.view = view;
        this.data = this._getData();
    }

    getData() {
        return this.data;
    }

    _getData() {
        const data = {
            selectedGroupIndex: 0,
            groups: [
                {
                    id: '0',
                    type: 'female',
                    name: I18n.t('areasOfFocus.female')
                },
                {
                    id: '1',
                    type: 'male',
                    name: I18n.t('areasOfFocus.male')
                }
            ]
        };
        return data;
    }

    didSelectGroup(index) {
        this.data.selectedGroupIndex = index;
        this.view.setTabViewData(this.data);
    }

    unmountView() {
        this.view = null;
    }
}
