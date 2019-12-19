
export default class CountdownTimer {
    constructor(seconds, onTick, onComplete, tickInterval = 1000) {
        this.seconds = seconds;
        this.tickInterval = tickInterval;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this._onTick = this._onTick.bind(this);
    }

    start() {
        clearTimeout(this.timeoutId);
        this.count = 0;
        this.tickTime = Date.now();
        this.timeoutId = setTimeout(this._onTick, this.tickInterval);
    }

    resume() {
        if (this.count >= this.seconds) {
            return;
        }
        this.tickTime = Date.now();
        this.timeoutId = setTimeout(this._onTick, this.tickInterval);
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
            const timeDiff = now - this.tickTime - this.tickInterval;
            this.tickTime = now;
            this.timeoutId = setTimeout(this._onTick, this.tickInterval - timeDiff);
            this.onTick(this.count);
        }
    }
}
