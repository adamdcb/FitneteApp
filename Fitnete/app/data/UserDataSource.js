import FNDatabase from './local-storage/FNDatabase';

export default class UserDataSource {

    async getUser() {
        const db = await this._getDatabase();
        const user = db.objectForPrimaryKey('User', 1) || null;
        return {
            id: user.id,
            termsAccepted: user.termsAccepted,
            gender: user.gender,
            height: user.height,
            weight: user.weight,
            targetWeight: user.targetWeight,
            fitnessLevel: user.fitnessLevel,
            areasOfFocus: user.areasOfFocus.map(area => area),
            unit: user.unit
        };
    }

    async setUser(userData) {
        const db = await this._getDatabase();
        try {
            db.write(() => {
                db.create('User', {
                    id: 1,
                    ...userData
                }, true);
            });
            return true;
        } catch (e) {
            console.log('setUser()', e);
            return false;
        }
    }

    async _getDatabase() {
        if (!this.database) {
            this.database = await FNDatabase.open();
        }
        return this.database;
    }
}