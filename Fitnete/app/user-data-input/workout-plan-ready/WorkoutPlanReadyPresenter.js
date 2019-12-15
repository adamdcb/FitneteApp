import TrainingDataSource from '../../data/TrainingDataSource';


export default class WorkoutPlanReadyPresenter {
    constructor(view) {
        this.view = view;
        this.dataSource = new TrainingDataSource();
    }

    async loadData() {
        const duration = await this.dataSource.getAnyProgramDuration();
        const data = {
            duration
        };
        if (this.view) {
            this.view.setData(data);
        }
    }

    unmountView() {
        this.view = null;
    }
}