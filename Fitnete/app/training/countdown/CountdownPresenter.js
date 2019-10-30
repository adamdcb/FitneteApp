const STEP = 5;

export default class CountdownPresenter {
    constructor(view) {
        this.view = view;
    }

    start(seconds) {
        this.startTimeout = setTimeout(() => {
            clearTimeout(this.startTimeout);
            this._startCountdown(seconds);
        }, 500);
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
}