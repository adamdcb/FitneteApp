import I18n from '../../utils/i18n/I18n';

export default class AreaOfFocusTabViewScenePresenter {
    constructor(view, type) {
        this.view = view;
        this.type = type;
        this.data = this._getData();
    }

    getData() {
        return this.data[this.type];
    }

    _getData() {
        const data = {
            female: [
                {
                    id: '0',
                    type: 'arms_and_chest',
                    name: I18n.t('areasOfFocus.armsAndChest'),
                    selected: false
                },
                {
                    id: '1',
                    type: 'abdominals',
                    name: I18n.t('areasOfFocus.abdominals'),
                    selected: false
                },
                {
                    id: '2',
                    type: 'arms_and_back',
                    name: I18n.t('areasOfFocus.armsAndBack'),
                    selected: false
                },
                {
                    id: '3',
                    type: 'legs',
                    name: I18n.t('areasOfFocus.legs'),
                    selected: false
                }
            ],
            male: [
                {
                    id: '0',
                    type: 'arms_and_chest',
                    name: I18n.t('areasOfFocus.armsAndChest'),
                    selected: false
                },
                {
                    id: '1',
                    type: 'abdominals',
                    name: I18n.t('areasOfFocus.abdominals'),
                    selected: false
                },
                {
                    id: '2',
                    type: 'arms_and_back',
                    name: I18n.t('areasOfFocus.armsAndBack'),
                    selected: false
                },
                {
                    id: '3',
                    type: 'legs',
                    name: I18n.t('areasOfFocus.legs'),
                    selected: false
                }
            ]
        };
        return data;
    }

    didToggleArea(index) {
        const data = this.data[this.type];
        data[index].selected = !data[index].selected;
        this.view.setAreasData(data);
    }

    unmountView() {
        this.view = null;
    }
}
