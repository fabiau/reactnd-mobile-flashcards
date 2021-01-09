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
} = {}) {
  try {
    const { status } = yield call(askPermission);
    if (status === Permissions.PermissionStatus.GRANTED) {
      const now = yield call(getNow);
      // Set the notification for tomorrow 1 minute earlier
      now.setMinutes(now.getMinutes() - 1);

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
          hour: now.getHours(),
          minute: now.getMinutes(),
          repeats: true,
        },
      });
    }
  } catch (error) {
    console.warn(`Error scheduling notification ${identifier}`, error);
  }
}

export function* setDailyNotification({
  identifier = 'default',
  content: { title, body },
} = {}) {
  const allNotifications = yield call(
    Notifications.getAllScheduledNotificationsAsync
  );
  const scheduled = allNotifications.some(
    (notification) => notification.identifier === identifier
  );

  if (!scheduled) {
    yield call(rescheduleDailyNotification, {
      identifier,
      content: { title, body },
    });
  }
}
