import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

import I18n from '../../utils/i18n/I18n';

const CHANNEL = {
    reminder: 'reminder'
};
const CHANNEL_ID = {
    reminder: '86440091-a53d-415a-beb4-cb7334708dca'
}
const SCHEDULE_NOTIFICATION_PREFIX = '@Fitnete.notification.schedule.';

function _createNotification(channel, { id, title, body, data }) {
    const notification = new firebase.notifications.Notification()
        .setNotificationId(`${SCHEDULE_NOTIFICATION_PREFIX}${channel}_${id}`)
        .setTitle(title)
        .setBody(body)
        .setData(data);
    if (Platform.OS === 'android') {
        notification.android.setChannelId(CHANNEL_ID[channel])
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setSmallIcon('ic_notification')
            .android.setColor('#08C757');
    } else if (Platform.OS === 'ios') {
        notification.ios.setBadge(1);
    }
    return notification;
}

function _createSchedule({ fireDate, repeat }) {
    const schedule = {
        fireDate,
        exact: true
    };
    if (repeat) {
        schedule.repeatInterval = repeat;
    }
    return schedule;
}

export default {
    CHANNEL,

    registerListener() {
        this.notificationListener = firebase
            .notifications()
            .onNotification(async notification => await firebase.notifications().displayNotification(notification));
    },

    async requestPermission() {
        return firebase.messaging().requestPermission();
    },

    async createNotificationChannel(name) {
        if (Platform.OS !== 'android') {
            return;
        }
        const channel = new firebase.notifications.Android.Channel(
            CHANNEL_ID[name],
            I18n.t(`notification.${name}.channelName`),
            firebase.notifications.Android.Importance.Max
        )
            .setDescription(I18n.t(`notification.${name}.channelDescription`));
        firebase.notifications().android.createChannel(channel);
    },

    async getScheduleNotifications(channel) {
        const firebaseNotifications = await firebase.notifications().getScheduledNotifications();
        return firebaseNotifications.filter(notif => notif.notificationId.startsWith(`${SCHEDULE_NOTIFICATION_PREFIX}${channel}`));
    },

    async scheduleNotification(channel, notificationData, scheduleData) {
        try {
            const notification = _createNotification(channel, notificationData);
            const schedule = _createSchedule(scheduleData);
            firebase.notifications().scheduleNotification(notification, schedule);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async cancelScheduleNotificationsInChannel(channel) {
        try {
            const firebaseNotifications = await firebase.notifications().getScheduledNotifications();
            const notifications = firebaseNotifications.filter(notif => notif.notificationId.startsWith(`${SCHEDULE_NOTIFICATION_PREFIX}${channel}`));
            for (let index = 0; index < notifications.length; index++) {
                const notification = notifications[index];
                await firebase.notifications().cancelNotification(notification.notificationId);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
