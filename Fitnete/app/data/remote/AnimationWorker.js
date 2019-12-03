import FastImage from 'react-native-fast-image';

const API_KEY = 'GeGpIT9cdSaHtsl1OoL6J8OiB7DIhzoU9KYGTplp';
const BASE_URI = 'https://7lg8awpfac.execute-api.us-east-2.amazonaws.com/dev/animations/';

export default {
    getSourceObj(animationName) {
        return {
            uri: `${BASE_URI}${animationName}`,
            headers: { 'x-api-key': `${API_KEY}` },
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable
        }
    },

    preloadAnimations(animationNames) {
        FastImage.preload(animationNames.map(name => this.getSourceObj(name)));
    }
}
