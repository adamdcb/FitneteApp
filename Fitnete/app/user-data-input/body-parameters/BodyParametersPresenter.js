import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';

export default class BodyParametersPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
        this.data = [];
    }

    async loadData() {
        const user = await this.dataSource.getUser();
        const bodyParams = ((user || {}).fitness || {}).bodyParams || {};
        this.data = this._getData(bodyParams);
        this.view.setData(this.data);
    }

    // async didChangeLevel(levelIndex) {
    //     if (this.data.selectedLevelIndex === levelIndex) {
    //         return;
    //     }
    //     this.data.selectedLevelIndex = levelIndex;
    //     const data = {
    //         fitness: {
    //             level: levelIndex
    //         }
    //     };
    //     this.view.setFitnessLevelData(this.data.levels[this.data.selectedLevelIndex], this.data.levels.length, this.data.selectedLevelIndex);
    //     this.dataSource.setUser(data);
    // }

    unmountView() {
        this.view = null;
    }

    _getData(bodyParams) {
        const data = [
            {
                id: 'height',
                title: I18n.t('bodyParameters.height'),
                iconName: 'height',
                value: bodyParams.height || 0,
                unit: bodyParams.heightUnit || ''
            },
            {
                id: 'weight',
                title: I18n.t('bodyParameters.weight'),
                iconName: 'weight',
                value: bodyParams.weight || 0,
                unit: bodyParams.weightUnit || ''
            },
            {
                id: 'target_weight',
                title: I18n.t('bodyParameters.targetWeight'),
                iconName: 'target-weight',
                value: bodyParams.targetWeight || 0,
                unit: bodyParams.weightUnit || ''
            },
            {
                id: 'food_preference',
                title: I18n.t('bodyParameters.foodPreferences'),
                iconName: 'food',
                value: bodyParams.foodPreference || ''
            }
        ];
        return data;
    }
}
