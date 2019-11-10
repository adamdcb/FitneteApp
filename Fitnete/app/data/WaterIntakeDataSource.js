import FNDatabase from "./local-storage/FNDatabase";

export default class WaterIntakeDataSource {

    async getTodaysWaterIntake() {

    }

    async setWaterIntake(amount) {
        const db = await this._getDatabase();
        try {
            db.write(() => {
                db.create('WaterIntake', {
                    date: new Date(),
                    amount
                }, true);
            });
            return true;
        } catch (e) {
            console.log('setWaterIntake()', e);
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
