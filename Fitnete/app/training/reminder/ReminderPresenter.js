import I18n from '../../utils/i18n/I18n';
import Utils from '../../utils/utils/Utils';

export default class ReminderPresenter {
    constructor(view) {
        this.view = view;
        this._setTimeData();
    }

    getWeekdays() {
        return this.weekdays;
    }

    getHours() {
        return this.hours;
    }

    getMinutes() {
        return this.minutes;
    }

    getReminder() {
        const h = 20; // TODO
        const m = 0; // TODO
        const hStr = `${h}`.padStart(2, '0');
        const mStr = `${m}`.padStart(2, '0');
        const reminder = {
            activeRepeatButton: 'weekly', // TODO
            selectedWeekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], // TODO
            selectedTimeIndexes: [h, m],
            time: `${hStr}:${mStr}`
        }
        if (this.view) {
            this.view.setData(reminder);
        }
    }

    addReminder(timeIndexes) {
        console.log(timeIndexes);
    }

    unmountView() {
        this.view = null;
    }

    _setTimeData() {
        const hours = Array.from({ length: 24 }).map((value, index) => `${index}`.padStart(2, '0'));
        const minutes = Array.from({ length: 60 }).map((value, index) => `${index}`.padStart(2, '0'));
        this.weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            .map(day => ({
                id: day,
                name: I18n.t(`weekdays.${day}`)
            }));
        this.hours = Utils.arrayWithPadding(hours, '');
        this.minutes = Utils.arrayWithPadding(minutes, '');
    }
}