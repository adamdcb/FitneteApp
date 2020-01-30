import WorkoutDataManager from '../../data/WorkoutDataManager';

export default class PrepareWorkoutPlanPresenter {
    constructor(view) {
        this.view = view;
    }

    async startPreparingWorkoutPlan() {
        let progress = 0;
        let ok = null;
        this.interval = setInterval(() => {
            if (progress < 90 || ok !== null) {
                progress = Math.min(progress + 6, 100);
                if (progress >= 100) {
                    clearInterval(this.interval);
                    this.timeout = setTimeout(() => {
                        clearTimeout(this.timeout);
                        this.view.onContinue();
                    }, 800);
                }
                this.view.setProgress(progress);
            }
        }, 200);
        ok = await WorkoutDataManager.prepareWorkouts();
    }

    unmountView() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        this.view = null;
    }
}
