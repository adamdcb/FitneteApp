import FNDatabase from "./local-storage/FNDatabase";
import AsyncWrapper from "../utils/utils/AsyncWrapper";

export default class WaterIntakeDataSource {

    getWaterIntake(start, end) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = await this._getDatabase();
            const waterIntakes = db.objects('WaterIntake').filtered('date >= $0 AND date <= $1', start, end);
            resolve(waterIntakes.reduce((prev, current) => prev = prev + current.amount, 0));
        });
    }

    saveWaterIntake(amount) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = await this._getDatabase();
            try {
                db.write(() => {
                    db.create('WaterIntake', {
                        date: new Date(),
                        amount
                    }, true);
                });
                resolve(true);
            } catch (e) {
                console.log('saveWaterIntake()', e);
                resolve(false);
            }
        });
    }

    getNumberOfAchievedGoals() {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = await this._getDatabase();
            const count = db.objects('WaterIntakeGoal').length;
            resolve(count);
        });
    }

    isGoalAchieved(date) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = await this._getDatabase();
            const goal = db.objects('WaterIntakeGoal').filtered('date = $0', date)[0];
            resolve(goal && goal.achieved);
        });
    }

    saveWaterIntakeGoal(date) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = await this._getDatabase();
            try {
                db.write(() => {
                    db.create('WaterIntakeGoal', {
                        date,
                        achieved: true
                    }, true);
                });
                resolve(true);
            } catch (e) {
                console.log('saveWaterIntakeGoal()', e);
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
