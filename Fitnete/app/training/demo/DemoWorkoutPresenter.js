import * as data from '../../utils/data/demo_workout.json';

export default class DemoWorkoutPresenter {
    constructor(view) {
        this.view = view;
    }

    loadData() {
        if (this.view) {
            this.view.setData(data.programs[0]);
        }
    }

    unmountView() {
        this.view = null;
    }
}