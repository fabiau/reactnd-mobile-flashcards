import { call } from 'redux-saga/effects';
import { Permissions } from 'react-native-unimodules';
import * as Notifications from 'expo-notifications';
import {
  askPermission,
  getNow,
  rescheduleDailyNotification,
} from '../../sagas/notifications';

describe('sagas::notifications', () => {
  test('askPermission', () => {
    const iterator = askPermission();
    expect(iterator.next().value).toEqual(
      call(Permissions.askAsync, Permissions.NOTIFICATIONS)
    );
    expect(
      iterator.next({ status: Permissions.PermissionStatus.GRANTED })
    ).toEqual({
      done: true,
      value: { status: Permissions.PermissionStatus.GRANTED },
    });
  });

  describe('rescheduleDailyNotification', () => {
    describe('with granted notification permission', () => {
      const ms = 1610223081719;
      const iterator = rescheduleDailyNotification({
        identifier: 'test_identifier',
        content: {
          title: 'Lorem Ipsum',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      });

      it('asks for permission', () => {
        expect(iterator.next().value).toEqual(call(askPermission));
      });

      it('gets current date instance', () => {
        expect(
          iterator.next({ status: Permissions.PermissionStatus.GRANTED }).value
        ).toEqual(call(getNow));
      });

      it('cancels scheduled notifications of the identifier', () => {
        expect(iterator.next(new Date(ms)).value).toEqual(
          call(
            Notifications.cancelScheduledNotificationAsync,
            'test_identifier'
          )
        );
      });

      it('schedules a notification with the passed options for the next day 1 minute earlier', () => {
        expect(iterator.next().value).toEqual(
          call(Notifications.scheduleNotificationAsync, {
            identifier: 'test_identifier',
            content: {
              title: 'Lorem Ipsum',
              body:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              sound: true,
              priority: Notifications.AndroidNotificationPriority.HIGH,
              sticky: false,
              vibrate: true,
            },
            trigger: {
              hour: new Date(ms).getHours(),
              minute: new Date(ms - 1000 * 60).getMinutes(),
              repeats: true,
            },
          })
        );
      });
    });

    describe('without granted notification permission', () => {
      const iterator = rescheduleDailyNotification();

      it('asks for permission', () => {
        expect(iterator.next().value).toEqual(call(askPermission));
      });

      it("finishes when the permission isn't granted", () => {
        expect(
          iterator.next({ status: Permissions.PermissionStatus.UNDETERMINED })
        ).toEqual({
          done: true,
          value: undefined,
        });
      });
    });
  });
});
