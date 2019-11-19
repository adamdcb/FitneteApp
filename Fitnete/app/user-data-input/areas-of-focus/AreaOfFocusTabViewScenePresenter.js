import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';
import areasOfFocus from '../../data/local-storage/content/areasOfFocus';

const HIGHLIGHT_ICON_POSITIONS = {
    male: {
        arms_and_chest: {
            top: 68,
            left: 18
        },
        abdominals: {
            top: 108,
            left: 35
        },
        arms_and_back: {
            top: 56,
            right: 12
        },
        legs: {
            top: 172,
            right: 22
        }
    },
    female: {
        arms_and_chest: {
            top: 68,
            left: 18
        },
        abdominals: {
            top: 108,
            left: 35
        },
        arms_and_back: {
            top: 58,
            right: 14
        },
        legs: {
            top: 156,
            right: 22
        }
    }
};

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
        const data = {};
        areasOfFocus.forEach(item => {
            data[item.type] = item.areas.map(area => ({
                id: area.id,
                type: area.type,
                name: I18n.t(`areasOfFocus.${area.name}`),
                selected: false,
                highlight: {
                    iconName: 'area_highlight',
                    position: this._getHighlightIconPosition(item.type, area.type)
                }
            }))
        })
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

    _getHighlightIconPosition(gender, area) {
        return HIGHLIGHT_ICON_POSITIONS[gender][area] || {
            top: 0,
            left: 0
        }
    }  
}
