import FNDatabase from "./local-storage/FNDatabase";

export default class WaterIntakeDataSource {

    async getWaterIntake(start, end) {
        const db = await this._getDatabase();
        const waterIntakes = db.objects('WaterIntake').filtered('date >= $0 AND date <= $1', start, end);
        return waterIntakes.reduce((prev, current) => prev = prev + current.amount, 0);
    }

    async saveWaterIntake(amount) {
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
            console.log('saveWaterIntake()', e);
            return false;
        }
    }

    async getNumberOfAchievedGoals() {
        const db = await this._getDatabase();
        const count = db.objects('WaterIntakeGoal').length;
        return count;
    }

    async isGoalAchieved(date) {
        const db = await this._getDatabase();
        const goal = db.objects('WaterIntakeGoal').filtered('date = $0', date)[0];
        return goal && goal.achieved;
    }

    async saveWaterIntakeGoal(date) {
        const db = await this._getDatabase();
        try {
            db.write(() => {
                db.create('WaterIntakeGoal', {
                    date,
                    achieved: true
                }, true);
            });
            return true;
        } catch (e) {
            console.log('saveWaterIntakeGoal()', e);
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
