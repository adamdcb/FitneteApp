import UserDataSource from '../../data/UserDataSource';
import WorkoutDataManager from '../../data/WorkoutDataManager';


export default class WorkoutPlanReadyPresenter {
    constructor(view) {
        this.view = view;
        this.userDataSource = new UserDataSource();
    }

    async loadData() {
        const user = await this.userDataSource.getUser();
        const duration = WorkoutDataManager.PROGRAM_SLICE[user.fitnessLevel].length * 7;
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