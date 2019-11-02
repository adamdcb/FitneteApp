
export default class CountdownTimer {
    constructor(seconds, onTick, onComplete) {
        this.seconds = seconds;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this._onTick = this._onTick.bind(this);
    }

    start() {
        clearTimeout(this.timeoutId);
        this.count = 0;
        this.tickTime = Date.now();
        this.timeoutId = setTimeout(this._onTick, 1000);
    }

    resume() {
        if (this.count >= this.seconds) {
            return;
        }
        this.tickTime = Date.now();
        this.timeoutId = setTimeout(this._onTick, 1000);
    }

    pause() {
        clearTimeout(this.timeoutId);
    }

    stop() {
        clearTimeout(this.timeoutId);
    }

    _onTick() {
        this.count = this.count + 1;
        if (this.count >= this.seconds) {
            clearTimeout(this.timeoutId);
            this.onComplete();
        } else {
            const now = Date.now();
            const timeDiff = now - this.tickTime - 1000;
            this.tickTime = now;
            this.timeoutId = setTimeout(this._onTick, 1000 - timeDiff);
            this.onTick(this.count);
        }
    }
}
