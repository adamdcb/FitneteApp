import UserDataSource from '../data/UserDataSource';
import WaterIntakeDataSource from '../data/WaterIntakeDataSource';
import WaterIntakeUtils from '../utils/utils/WaterIntakeUtils';
import Volume from '../utils/utils/converter/Volume';

const DEFAULT_DRINK_SIZE = 0.24; // litre
const SLIDER_STEP_SIZE = 0.02; // litre

export default class WaterTrackerPresenter {
    constructor(view) {
        this.view = view;
        this.userDataSource = new UserDataSource();
        this.waterIntakeDataSource = new WaterIntakeDataSource();
        this.drinkSize = DEFAULT_DRINK_SIZE; // always in metric system
        this.unit = 'metric';
        this.totalWaterIntakeAmount = 0;
        this.goals = 0;
    }

    async loadData() {
        const user = await this.userDataSource.getUser();
        this.unit = user.unit;
        const today = this._getTodaysBounds();
        const todaysWaterIntake = await this.waterIntakeDataSource.getWaterIntake(today.start, today.end);
        this.totalWaterIntakeAmount = Math.max(WaterIntakeUtils.getDailyWaterIntake(user.weight) - todaysWaterIntake, 0);
        this.goals = await this.waterIntakeDataSource.getNumberOfAchievedGoals();
        const data = {
            drinkSize: Volume.convert(this.drinkSize, this.unit),
            drinkSizeText: Volume.getFormattedValue(this.drinkSize, this.unit),
            drinkStepSize: Volume.convert(SLIDER_STEP_SIZE, this.unit),
            totalWaterIntake: Volume.getFormattedValue(this.totalWaterIntakeAmount, this.unit),
            customDrinkSizeBounds: {
                min: 0,
                max: Volume.convert(1.0, this.unit)
            },
            goals: this.goals
        }
        if (this.view) {
            this.view.setData(data);
        }
    }

    async updateDrinkSize(newDrinkSize) {
        this.drinkSize = Volume.convertToMetric(newDrinkSize, this.unit);
        const data = {
            drinkSize: newDrinkSize,
            drinkSizeText: Volume.getFormattedValue(this.drinkSize, this.unit)
        }
        if (this.view) {
            this.view.setData(data);
        }
    }

    async drinkWater() {
        const today = this._getTodaysBounds(true);
        this.totalWaterIntakeAmount = Math.max(this.totalWaterIntakeAmount - this.drinkSize, 0);
        const data = {
            totalWaterIntake: Volume.getFormattedValue(this.totalWaterIntakeAmount, this.unit)
        }
        await this.waterIntakeDataSource.saveWaterIntake(this.drinkSize);
        if (this.totalWaterIntakeAmount === 0) {
            const isGoalAchieved = await this.waterIntakeDataSource.isGoalAchieved(today.start);
            if (!isGoalAchieved) {
                this.waterIntakeDataSource.saveWaterIntakeGoal(today.start);
                this.goals = this.goals + 1;
                data.goals = this.goals;
            }
        }
        if (this.view) {
            this.view.setData(data);
        }
    }

    unmountView() {
        this.view = null;
    }

    _getTodaysBounds(utc = false) {
        const start = new Date();
        const end = new Date();
        if (utc) {
            start.setUTCHours(0, 0, 0, 0);
            end.setUTCHours(23, 59, 59, 999);
        } else {
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        }
        return { start, end };
    }
}