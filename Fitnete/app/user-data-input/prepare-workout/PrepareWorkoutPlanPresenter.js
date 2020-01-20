import IAPService from '../../utils/iap/IAPService.js';
import WorkoutDataManager from '../../data/WorkoutDataManager.js';
import UserDataSource from '../../data/UserDataSource.js';

export default class PrepareWorkoutPlanPresenter {
    constructor(view) {
        this.view = view;
        this.userDataSource = new UserDataSource();
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
            let subscriptionId = null;
            if (prem) {
                const lastIndex = subscriptions.length - 1; // TODO: Is this right?
                subscriptionId = subscriptions[lastIndex].productId;
            }
            await this.userDataSource.setUser({
                subscriptionId
            });
            await WorkoutDataManager.prepareWorkouts();
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
