import IAPService from '../../utils/iap/IAPService.js';
import WorkoutDataManager from '../../data/WorkoutDataManager.js';

export default class PrepareWorkoutPlanPresenter {
    constructor(view) {
        this.view = view;
    }

    async startPreparingWorkoutPlan() {
        let progress = 0;
        let premium = null;
        // TODO: Add real implemenation!
        this.interval = setInterval(() => {
            if (progress < 90 || premium !== null) {// wait for subscriptions response
                progress = Math.min(progress + 6, 100);
                if (progress >= 100) {
                    clearInterval(this.interval);
                    this.timeout = setTimeout(() => {
                        clearTimeout(this.timeout);
                        this.view.onContinue(premium);
                    }, 800);
                }
                this.view.setProgress(progress);
            }
        }, 200);

        try {
            const subscriptions = await IAPService.getAvailableSubscriptions();
            const prem = subscriptions.length > 0;
            await WorkoutDataManager.prepareWorkouts(prem);
            premium = prem;
        } catch (error) {
            console.log('startPreparingWorkoutPlan()', error);
        }
    }

    unmountView() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        this.view = null;
    }
}
