import AsyncStorage from '@react-native-community/async-storage';
import merge from "lodash.merge";

const USER_KEY = "@Fitnete.User.Local.Storage.Key";

export default class UserDataSource {

    async getUser() {
        try {
            const userStr = await AsyncStorage.getItem(USER_KEY);
            return userStr ? JSON.parse(userStr) : null;
        } catch (e) {
            return null;
        }
    }

    async setUser(userData) {
        try {
            const userStr = await AsyncStorage.getItem(USER_KEY);
            let user = {};
            if (userStr) {
                user = JSON.parse(userStr);
            }
            const newUser = merge(user, userData)
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
            return true;
        } catch (e) {
            return false;
        }
    }
}