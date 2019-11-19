import I18n from '../../utils/i18n/I18n';
import UserDataSource from '../../data/UserDataSource';

const NO_OF_LEVELS = 4;

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
            levels: Array.from({ length: NO_OF_LEVELS }).map((value, index) => {
                const level = index + 1;
                return {
                    id: `level_${level}`,
                    title: I18n.t(`selectFitLevel.level${level}Title`),
                    description: I18n.t(`selectFitLevel.level${level}Description`),
                    descriptionHighlight: I18n.t(`selectFitLevel.level${level}DescriptionHighlight`)
                }
            })
        };
        return data;
    }
}
