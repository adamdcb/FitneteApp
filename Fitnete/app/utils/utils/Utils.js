export default {
    secondsToMMSS(seconds) {
        const min = Math.trunc(seconds / 60);
        const sec = seconds - (min * 60);
        if (sec > 0) {
            return `${min}:${sec}m`;
        } else {
            return `${min}m`;
        }
    },
    secondsToPlainMMSS(seconds) {
        const min = Math.trunc(seconds / 60);
        const sec = seconds - (min * 60);
        const minStr = `${min}`.padStart(2, '0');
        const secStr = `${sec}`.padStart(2, '0');
        return `${minStr}:${secStr}`;
    },
    snakeCaseToCamelCase(str) {
        return str.replace(
            /([-_][a-z])/g,
            (group) => group.toUpperCase()
                .replace('-', '')
                .replace('_', '')
        );
    }
}