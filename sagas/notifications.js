import { call, cancel } from 'redux-saga/effects';
import { Permissions } from 'react-native-unimodules';
import * as Notifications from 'expo-notifications';

export function* askPermission() {
  return yield call(Permissions.askAsync, Permissions.NOTIFICATIONS);
}

export function getNow() {
  return new Date();
}

export function* rescheduleDailyNotification({
  identifier = 'default',
  content: { title, body },
  trigger: { hour = 20, minute = 0 },
} = {}) {
  try {
    const { status } = yield call(askPermission);
    if (status === Permissions.PermissionStatus.GRANTED) {
      const now = yield call(getNow);
      yield call(Notifications.cancelScheduledNotificationAsync, identifier);
      yield call(Notifications.scheduleNotificationAsync, {
        identifier,
        content: {
          title,
          body,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          sticky: false,
          vibrate: true,
        },
        trigger: {
          hour,
          minute,
          repeats: true,
        },
      });
    }
  } catch (error) {
    console.warn(`Error scheduling notification ${identifier}`, error);
  }
}
