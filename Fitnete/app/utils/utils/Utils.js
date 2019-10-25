export default {
    secondsToMMSS(seconds) {
        const min = Math.trunc(seconds / 60);
        const sec = seconds - (min * 60);
        if (sec > 0) {
            return `${min}:${sec}m`;
        } else {
            return `${min}m`;
        }
    }
}