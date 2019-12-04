import UserDataSource from "../../data/UserDataSource";
import AnimationUtils from "../../utils/utils/AnimationUtils";
import AnimationWorker from "../../data/remote/AnimationWorker";

const STEP = 5;
const COUNT = 3; // seconds

export default class CountdownPresenter {
    constructor(view, workout) {
        this.view = view;
        this.workout = workout;
        this.userDataSource = new UserDataSource();
    }

    start() {
        this.view.setProgress(0, COUNT);
        this.startTimeout = setTimeout(() => {
            clearTimeout(this.startTimeout);
            this._startCountdown(COUNT);
        }, 500);
        this._preloadFirstAnimation();
    }

    unmountView() {
        clearInterval(this.interval);
        clearTimeout(this.startTimeout);
        clearTimeout(this.endTimeout);
        this.view = null;
    }

    _startCountdown(seconds) {
        let count = seconds * STEP;
        const progressStep = 100 / seconds;
        let progress = 0;
        this.interval = setInterval(() => {
            count = count - 1;
            progress = Math.min(progress + (progressStep / STEP), 100);
            if (progress >= 100) {
                clearInterval(this.interval);
                this.view.setProgress(100, 0);
                this._onCountdownDidEnd();
            } else {
                this.view.setProgress(progress, Math.trunc(count / STEP) + 1);
            }
        }, 1000 / STEP);
    }

    _onCountdownDidEnd() {
        this.endTimeout = setTimeout(() => {
            clearTimeout(this.endTimeout);
            this.view.onCountdownDidEnd();
        }, 500);
    }

    async _preloadFirstAnimation() {
        const user = await this.userDataSource.getUser();
        const exercise = this.workout.exercises[0];
        if (exercise && user) {
            const animationName = AnimationUtils.getAnimationName(exercise.name, user.gender);
            AnimationWorker.preloadAnimations([animationName]);
        }
    }
}