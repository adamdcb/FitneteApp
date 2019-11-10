import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';

export default class SelectFitLevelPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new UserDataSource();
        this.data = {};
    }

    async loadData() {
        const data = this._getDefaultData();
        const user = await this.dataSource.getUser();
        const level = user.fitnessLevel;
        if (level) {
            data.selectedLevelIndex = level
        } else {
            this._init(data);
        }
        this.data = data;
        this.view.setFitnessLevelData(this.data.levels[this.data.selectedLevelIndex], this.data.levels.length, this.data.selectedLevelIndex);
    }

    async didChangeLevel(levelIndex) {
        if (this.data.selectedLevelIndex === levelIndex) {
            return;
        }
        this.data.selectedLevelIndex = levelIndex;
        const data = {
            fitnessLevel: levelIndex
        };
        this.view.setFitnessLevelData(this.data.levels[this.data.selectedLevelIndex], this.data.levels.length, this.data.selectedLevelIndex);
        this.dataSource.setUser(data);
    }

    unmountView() {
        this.view = null;
    }

    async _init(data) {
        const initialData = {
            fitnessLevel: data.selectedLevelIndex
        };
        this.dataSource.setUser(initialData);
    }

    _getDefaultData() {
        const data = {
            selectedLevelIndex: 0,
            levels: [
                {
                    id: 'level_1',
                    title: I18n.t('selectFitLevel.level1Title'),
                    description: I18n.t('selectFitLevel.level1Description'),
                    descriptionHighlight: I18n.t('selectFitLevel.level1DescriptionHighlight')
                },
                {
                    id: 'level_2',
                    title: I18n.t('selectFitLevel.level2Title'),
                    description: I18n.t('selectFitLevel.level2Description'),
                    descriptionHighlight: I18n.t('selectFitLevel.level2DescriptionHighlight')
                },
                {
                    id: 'level_3',
                    title: I18n.t('selectFitLevel.level3Title'),
                    description: I18n.t('selectFitLevel.level3Description'),
                    descriptionHighlight: I18n.t('selectFitLevel.level3DescriptionHighlight')
                },
                {
                    id: 'level_4',
                    title: I18n.t('selectFitLevel.level4Title'),
                    description: I18n.t('selectFitLevel.level4Description'),
                    descriptionHighlight: I18n.t('selectFitLevel.level4DescriptionHighlight')
                }
            ]
        };
        return data;
    }
}
