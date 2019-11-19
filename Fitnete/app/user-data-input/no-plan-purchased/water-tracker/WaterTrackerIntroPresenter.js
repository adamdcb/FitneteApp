import UserDataSource from '../../../data/UserDataSource';
import WaterIntakeUtils from '../../../utils/utils/WaterIntakeUtils';
import Volume from '../../../utils/utils/converter/Volume';


export default class WaterTrackerIntroPresenter {
    constructor(view) {
        this.view = view;
        this.userDataSource = new UserDataSource();
    }

    async loadData() {
        const user = await this.userDataSource.getUser();
        const waterIntakeAmount = WaterIntakeUtils.getDailyWaterIntake(user.weight);
        const data = {
            waterIntakeAmount: Volume.getFormattedValue(waterIntakeAmount, user.unit)
        }
        if (this.view) {
            this.view.setData(data);
        }
    }

    unmountView() {
        this.view = null;
    }
}