import Utils from '../../utils/utils/Utils.js';
import CountdownTimer from '../../utils/utils/CountdownTimer';

export default class RestPresenter {
    constructor(view, exercise, nextExercise) {
        this.view = view;
        this.exercise = exercise;
        this.nextExercise = nextExercise;
        this._onTick = this._onTick.bind(this);
        this._onComplete = this._onComplete.bind(this);
    }

    startTimer() {
        this.view.setData({
            countdownText: Utils.secondsToPlainMMSS(this.exercise.restTime),
            nextExercise: this.nextExercise.title
        });
        this.countdownTimer = new CountdownTimer(this.exercise.restTime, this._onTick, this._onComplete);
        this.countdownTimer.start();
    }

    _onTick(count) {
        this.view.setData({
            countdownText: Utils.secondsToPlainMMSS(this.exercise.restTime - count)
        });
    }

    _onComplete() {
        this.view.setData({
            countdownText: Utils.secondsToPlainMMSS(0)
        });
        this.view.onRestCompleted();
    }

    unmountView() {
        this.countdownTimer.stop();
        this.view = null;
    }
}