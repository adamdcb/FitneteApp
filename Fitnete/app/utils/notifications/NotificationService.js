import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

import I18n from '../../utils/i18n/I18n';

const CHANNEL = {
    reminder: 'reminder'
};
const CHANNEL_ID = {
    reminder: '86440091-a53d-415a-beb4-cb7334708dca'
}

function _createNotification(channel, { id, title, body, data }) {
    const notification = new firebase.notifications.Notification()
        .setNotificationId(id)
        .setTitle(title)
        .setBody(body)
        .setData(data);
    if (Platform.OS === 'android') {
        notification.android.setChannelId(CHANNEL_ID[channel])
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setSmallIcon('ic_notification')
            .android.setColor('#08C757')
            .android.setAutoCancel(true);
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

    init() {
        this.notificationListener = firebase
            .notifications()
            .onNotification(async notification => await firebase.notifications().displayNotification(notification));
    },

    deinit() {
        if (this.notificationListener) {
            this.notificationListener = null;
        }
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

    async cancelScheduleNotifications(notificationIds) {
        try {
            for (let index = 0; index < notificationIds.length; index++) {
                const notificationId = notificationIds[index];
                await firebase.notifications().cancelNotification(notificationId);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
