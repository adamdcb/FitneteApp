import FNDatabase from './local-storage/FNDatabase';
import AsyncWrapper from '../utils/utils/AsyncWrapper';

export default class UserDataSource {

    getUser() {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = await this._getDatabase();
            const user = db.objectForPrimaryKey('User', 1);
            const userObj = user ? {
                id: user.id,
                termsAccepted: user.termsAccepted,
                gender: user.gender,
                height: user.height,
                weight: user.weight,
                targetWeight: user.targetWeight,
                fitnessLevel: user.fitnessLevel,
                areasOfFocus: user.areasOfFocus.map(area => area),
                unit: user.unit
            } : null;
            resolve(userObj);
        });
    }

    setUser(userData) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = await this._getDatabase();
            try {
                db.write(() => {
                    db.create('User', {
                        id: 1,
                        ...userData
                    }, true);
                });
                resolve(true);
            } catch (e) {
                console.log('setUser()', e);
                resolve(false);
            }
        });
    }

    async _getDatabase() {
        if (!this.database) {
            this.database = await FNDatabase.open();
        }
        return this.database;
    }
}