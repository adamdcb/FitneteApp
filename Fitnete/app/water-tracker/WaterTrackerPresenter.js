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
    }

    async loadData() {
        const user = await this.userDataSource.getUser();
        this.unit = user.unit;
        this.totalWaterIntakeAmount = WaterIntakeUtils.getDailyWaterIntake(user.weight);
        const data = {
            drinkSize: Volume.convert(this.drinkSize, this.unit),
            drinkSizeText: Volume.getFormattedValue(this.drinkSize, this.unit),
            drinkStepSize: Volume.convert(SLIDER_STEP_SIZE, this.unit),
            totalWaterIntake: Volume.getFormattedValue(this.totalWaterIntakeAmount, this.unit),
            customDrinkSizeBounds: {
                min: 0,
                max: Volume.convert(1.0, this.unit)
            }
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
        this.totalWaterIntakeAmount = Math.max(this.totalWaterIntakeAmount - this.drinkSize, 0);
        const data = {
            totalWaterIntake: Volume.getFormattedValue(this.totalWaterIntakeAmount, this.unit)
        }
        if (this.view) {
            this.view.setData(data);
        }
        await this.waterIntakeDataSource.setWaterIntake(this.drinkSize);
    }

    unmountView() {
        this.view = null;
    }
}