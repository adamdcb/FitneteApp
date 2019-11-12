export default {
    makeAsync(closure) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                closure(resolve, reject);
            }, 0);
        });
    }
}