import NotificationService from '../../utils/notifications/NotificationService';
import I18n from '../../utils/i18n/I18n';
import Utils from '../../utils/utils/Utils';

const MS_IN_DAY = 24 * 3600 * 1000;
const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const REPEAT = {
    once: 'once',
    weekly: 'weekly'
};

export default class ReminderPresenter {
    constructor(view) {
        this.view = view;
        this.selectedWeekdays = [];
        this.selectedHour = 0;
        this.selectedMinute = 0;
        this.selectedRepeat = REPEAT.weekly;
        this._setTimeData();
        NotificationService.createNotificationChannel(NotificationService.CHANNEL.reminder);
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

    setWeekdaySelected(weekday, selected) {
        if (selected) {
            if (!this.selectedWeekdays.includes(weekday)) {
                this.selectedWeekdays.push(weekday);
            }
        } else {
            this.selectedWeekdays = this.selectedWeekdays.filter(wd => wd !== weekday);
        }
    }

    setSelectedRepeat(repeat) {
        this.selectedRepeat = repeat;
        if (this.view) {
            this.view.setData({ activeRepeatButton: repeat });
        }
    }

    setSelectedTime(timeIndexes) {
        this.selectedHour = parseInt(timeIndexes[0], 10);
        this.selectedMinute = parseInt(timeIndexes[1], 10);
        if (this.view) {
            this.view.setData({
                selectedTimeIndexes: [this.selectedHour, this.selectedMinute],
                time: this._getSelectedTimeStr()
            });
        }
    }

    async getReminder() {
        let reminder = {};
        try {
            const notifications = await NotificationService.getScheduleNotifications(NotificationService.CHANNEL.reminder);
            console.log("notifications:", notifications);
            if (notifications.length === 0) {
                reminder = this._getReminder([], [0, 0], REPEAT.weekly);
            } else {
                const days = [];
                let timeIndexes = [];
                let repeat = REPEAT.weekly;
                notifications.forEach(notification => {
                    days.push(notification.data.day);
                    timeIndexes = notification.data.time.split(':').map(v => parseInt(v, 10));
                    repeat = notification.data.repeat
                });
                reminder = this._getReminder(days, timeIndexes, repeat);
            }
        } catch (error) {
            reminder = this._getReminder(WEEKDAYS, [0, 0], REPEAT.weekly);
        } finally {
            if (this.view) {
                this.view.setData(reminder);
            }
        }
    }

    async addReminder() {
        const date = new Date();
        date.setHours(this.selectedHour, this.selectedMinute, 0, 0);
        const weekday = date.getDay(); // Sunday - Saturday : 0 - 6
        try {
            // Cancel all notififcations before scheduling new ones
            await NotificationService.cancelScheduleNotificationsInChannel(NotificationService.CHANNEL.reminder);
            await NotificationService.requestPermission();
            for (let index = 0; index < this.selectedWeekdays.length; index++) {
                const day = this.selectedWeekdays[index];
                let dayIndex = (WEEKDAYS.indexOf(day) + 1) % 7; // covert to Sunday - Saturday : 0 - 6
                const dayDiff = (dayIndex - weekday + 7) % 7;
                const fireDate = new Date(date.getTime() + dayDiff * MS_IN_DAY);

                const notificationData = this._getNotificationData(day);
                const scheduleData = this._getScheduleData(fireDate);

                await NotificationService.scheduleNotification(NotificationService.CHANNEL.reminder, notificationData, scheduleData);
            }
            if (this.view) {
                this.view.onRemiderScheduled();
            }
        } catch (error) {
            console.log(error);
            if (this.view) {
                this.view.showPermissionDeniedError();
            }
        }
    }

    unmountView() {
        this.view = null;
    }

    _setTimeData() {
        const hours = Array.from({ length: 24 }).map((value, index) => `${index}`.padStart(2, '0'));
        const minutes = Array.from({ length: 60 }).map((value, index) => `${index}`.padStart(2, '0'));
        this.weekdays = WEEKDAYS.map(day => ({
            id: day,
            name: I18n.t(`weekdays.${day}`)
        }));
        this.hours = Utils.arrayWithPadding(hours, '');
        this.minutes = Utils.arrayWithPadding(minutes, '');
    }

    _getNotificationData(day) {
        const title = I18n.t('notification.reminder.title');
        const body = `${I18n.t('notification.reminder.body', { day: I18n.t(`weekdays.${day}`) })}`;
        const data = {
            title,
            body,
            day,
            time: `${this.selectedHour}:${this.selectedMinute}`,
            repeat: this.selectedRepeat
        };
        return {
            id: `${day}_${this.selectedHour}_${this.selectedMinute}`,
            title,
            body,
            data
        }
    }

    _getScheduleData(fireDate) {
        const schedule = {
            fireDate: fireDate.getTime()
        };
        if (this.selectedRepeat === REPEAT.weekly) {
            schedule.repeat = 'week';
        }
        return schedule;
    }

    _getReminder(weekdays, timeIndexes, repeat) {
        this.selectedHour = timeIndexes[0];
        this.selectedMinute = timeIndexes[1];
        this.selectedWeekdays = weekdays.map(wd => wd);
        this.selectedRepeat = repeat;
        return {
            activeRepeatButton: this.selectedRepeat,
            selectedWeekdays: this.selectedWeekdays,
            selectedTimeIndexes: [this.selectedHour, this.selectedMinute],
            time: this._getSelectedTimeStr()
        }
    }
    _getSelectedTimeStr() {
        const hStr = `${this.selectedHour}`.padStart(2, '0');
        const mStr = `${this.selectedMinute}`.padStart(2, '0');
        return `${hStr}:${mStr}`;
    }
}