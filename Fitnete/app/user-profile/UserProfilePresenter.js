import UserDataSource from '../data/UserDataSource';
import BodyParameterFactory from '../user-data-input/body-parameters/params/BodyParameterFactory';
import I18n from '../utils/i18n/I18n';

export default class UserProfilePresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
    }

    async loadData() {
        const user = await this.dataSource.getUser();
        const data = this._getData().map((item) => {
            const bParam = BodyParameterFactory.createParameter(item.type);
            return {
                id: item.id,
                type: item.type,
                title: I18n.t(`userProfile.params.${item.id}`),
                iconName: item.id.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase(),
                displayValue: bParam ? bParam.getFormattedValue(user[item.id], user.unit) : user[item.id]
            }
        })
        if (this.view) {
            this.view.setData(data);
        }
    }

    _getData() {
        return [
            {
                id: 'unit',
                type: 'unit'
            },
            {
                id: 'height',
                type: 'height'
            },
            {
                id: 'weight',
                type: 'weight'
            },
            {
                id: 'targetWeight',
                type: 'weight'
            },
            {
                id: 'areasOfFocus',
                type: 'areasOfFocus'
            },
            {
                id: 'fitnessLevel',
                type: 'fitnessLevel'
            }
        ]
    }

    unmountView() {
        this.view = null;
    }
}