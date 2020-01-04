import FNDatabase from './local-storage/FNDatabase';
import AsyncWrapper from '../utils/utils/AsyncWrapper';

export default class ReminderDataSource {

    getReminders() {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            const reminders = db.objects('Reminder')
                .map(reminder => ({
                    id: reminder.id,
                    day: reminder.day,
                    time: reminder.time,
                    repeatInterval: reminder.repeatInterval,
                    firstFireDate: reminder.firstFireDate
                }));
            resolve(reminders);
        });
    }

    saveReminder(reminder) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            try {
                db.write(() => {
                    db.create('Reminder', {
                        id: reminder.id,
                        day: reminder.day,
                        time: reminder.time,
                        repeatInterval: reminder.repeatInterval,
                        firstFireDate: reminder.firstFireDate
                    }, true);
                });
                resolve(true);
            } catch (e) {
                console.log('saveReminder()', e);
                resolve(false);
            }
        });
    }

    deleteAllReminders() {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            const reminders = db.objects('Reminder');
            try {
                db.write(() => {
                    db.delete(reminders);
                });
                resolve(true);
            } catch (e) {
                console.log('deleteAllReminders()', e);
                resolve(false);
            }
        });
    }

    deleteReminder(reminderId) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            const reminder = db.objectForPrimaryKey('Reminder', reminderId);
            try {
                if (reminder) {
                    db.write(() => {
                        db.delete(reminder);
                    });
                }
                resolve(true);
            } catch (e) {
                console.log('deleteReminder()', e);
                resolve(false);
            }
        });
    }
}