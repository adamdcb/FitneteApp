import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';

export default class AreaOfFocusTabViewScenePresenter {
    constructor(view, type) {
        this.view = view;
        this.type = type;
        this.dataSource = new UserDataSource();
        this.data = {};
    }

    async loadData() {
        const data = this._getDefaultData();
        const user = await this.dataSource.getUser();
        const areasOfFocus = user.areasOfFocus;
        if (areasOfFocus) {
            const areas = data[this.type];
            areas.forEach(a => {
                if (areasOfFocus.includes(a.type)) {
                    a.selected = true;
                }
            });
        }
        this.data = data;
        this.view.setAreasData(this.data[this.type]);
    }

    _getDefaultData() {
        const data = {
            female: [
                {
                    id: '0',
                    type: 'arms_and_chest',
                    name: I18n.t('areasOfFocus.armsAndChest'),
                    selected: false,
                    highlight: {
                        iconName: 'area_highlight',
                        position: {
                            top: 68,
                            left: 18
                        }
                    }
                },
                {
                    id: '1',
                    type: 'abdominals',
                    name: I18n.t('areasOfFocus.abdominals'),
                    selected: false,
                    highlight: {
                        iconName: 'area_highlight',
                        position: {
                            top: 108,
                            left: 35
                        }
                    }
                },
                {
                    id: '2',
                    type: 'arms_and_back',
                    name: I18n.t('areasOfFocus.armsAndBack'),
                    selected: false,
                    highlight: {
                        iconName: 'area_highlight',
                        position: {
                            top: 58,
                            right: 14
                        }
                    }
                },
                {
                    id: '3',
                    type: 'legs',
                    name: I18n.t('areasOfFocus.legs_and_glutes'),
                    selected: false,
                    highlight: {
                        iconName: 'area_highlight',
                        position: {
                            top: 156,
                            right: 22
                        }
                    }
                }
            ],
            male: [
                {
                    id: '0',
                    type: 'arms_and_chest',
                    name: I18n.t('areasOfFocus.armsAndChest'),
                    selected: false,
                    highlight: {
                        iconName: 'area_highlight',
                        position: {
                            top: 68,
                            left: 18
                        }
                    }
                },
                {
                    id: '1',
                    type: 'abdominals',
                    name: I18n.t('areasOfFocus.abdominals'),
                    selected: false,
                    highlight: {
                        iconName: 'area_highlight',
                        position: {
                            top: 108,
                            left: 35
                        }
                    }
                },
                {
                    id: '2',
                    type: 'arms_and_back',
                    name: I18n.t('areasOfFocus.armsAndBack'),
                    selected: false,
                    highlight: {
                        iconName: 'area_highlight',
                        position: {
                            top: 56,
                            right: 12
                        }
                    }
                },
                {
                    id: '3',
                    type: 'legs',
                    name: I18n.t('areasOfFocus.legs'),
                    selected: false,
                    highlight: {
                        iconName: 'area_highlight',
                        position: {
                            top: 172,
                            right: 22
                        }
                    }
                }
            ]
        };
        return data;
    }

    async didToggleArea(index) {
        const areas = this.data[this.type];
        const area = areas[index];
        area.selected = !area.selected;
        const data = {
            areasOfFocus: areas.filter(a => a.selected).map(a => a.type)
        };
        const success = await this.dataSource.setUser(data);
        if (success) {
            this.view.setAreasData(areas);
        }
    }

    unmountView() {
        this.view = null;
    }
}
