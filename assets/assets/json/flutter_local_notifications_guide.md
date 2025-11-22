# Local Notifications in Flutter  
## Complete implementation using `flutter_local_notifications`

Local notifications allow your Flutter app to display alerts and reminders even when the app isn’t running.  
In this guide, we’ll walk through a complete setup based on a dedicated service (`notification_service.dart`) and proper configuration for Android and iOS.

---

## 1. Add the dependency

In your `pubspec.yaml` file:

```yaml
dependencies:
  flutter_local_notifications: ^17.1.2
  timezone: ^0.9.3
```

Then run:

```bash
flutter pub get
```

---

## 2. Create `notification_service.dart`

The cleanest way to handle notifications is by creating a dedicated service class.  
Here’s an example based on your implementation:

```dart
// lib/core/services/notification_service.dart
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:timezone/data/latest_all.dart' as tz;

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  final FlutterLocalNotificationsPlugin _notificationsPlugin =
      FlutterLocalNotificationsPlugin();

  Future<void> init() async {
    tz.initializeTimeZones();

    const AndroidInitializationSettings androidInit =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const DarwinInitializationSettings iosInit = DarwinInitializationSettings();

    const InitializationSettings settings =
        InitializationSettings(android: androidInit, iOS: iosInit);

    await _notificationsPlugin.initialize(settings);
  }

  Future<void> showNotification({
    required int id,
    required String title,
    required String body,
  }) async {
    const AndroidNotificationDetails androidDetails =
        AndroidNotificationDetails(
      'default_channel_id',
      'General Notifications',
      channelDescription: 'Default channel for local notifications',
      importance: Importance.high,
      priority: Priority.high,
    );

    const NotificationDetails details = NotificationDetails(android: androidDetails);

    await _notificationsPlugin.show(id, title, body, details);
  }

  Future<void> scheduleNotification({
    required int id,
    required String title,
    required String body,
    required Duration delay,
  }) async {
    await _notificationsPlugin.zonedSchedule(
      id,
      title,
      body,
      tz.TZDateTime.now(tz.local).add(delay),
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'scheduled_channel_id',
          'Scheduled Notifications',
          channelDescription: 'Channel for scheduled notifications',
        ),
      ),
      androidAllowWhileIdle: true,
      uiLocalNotificationDateInterpretation:
          UILocalNotificationDateInterpretation.absoluteTime,
    );
  }

  Future<void> cancelAll() async {
    await _notificationsPlugin.cancelAll();
  }
}
```

You can now use the service anywhere in your app:

```dart
final notificationService = NotificationService();

await notificationService.init();
await notificationService.showNotification(
  id: 1,
  title: 'Welcome!',
  body: 'Local notifications are active 🚀',
);
```

---

## 3. Modify `AppDelegate.swift` (iOS)

In your `ios/Runner/AppDelegate.swift`, register the plugin and ensure notifications are handled correctly:

```swift
import UIKit
import Flutter
import flutter_local_notifications

@main
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {

    FlutterLocalNotificationsPlugin.setPluginRegistrantCallback { (registry) in
      GeneratedPluginRegistrant.register(with: registry)
    }

    GeneratedPluginRegistrant.register(with: self)

    if #available(iOS 10.0, *) {
      UNUserNotificationCenter.current().delegate = self as? UNUserNotificationCenterDelegate
    }

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

This ensures the plugin works properly and notifications are delivered even while the app is in the foreground.

---

## 4. Add permissions to `Info.plist`

To enable notifications on iOS, you must declare permissions in  
`ios/Runner/Info.plist` — right **before** the closing `</dict>` tag:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>fetch</string>
  <string>remote-notification</string>
</array>

<key>NSUserNotificationUsageDescription</key>
<string>This app uses notifications to send you reminders and important updates.</string>
```

> This text is shown when the system asks the user for notification permissions.

---

## 5. Request notification permissions in your app

On iOS, you must explicitly request permission from the user:

```dart
final plugin = FlutterLocalNotificationsPlugin();

await plugin
    .resolvePlatformSpecificImplementation<
        IOSFlutterLocalNotificationsPlugin>()
    ?.requestPermissions(
      alert: true,
      badge: true,
      sound: true,
    );
```

---

## 6. Usage examples

### Show an immediate notification
```dart
notificationService.showNotification(
  id: 1,
  title: 'Hello!',
  body: 'This is an instant local notification.',
);
```

### Schedule a notification (after 5 seconds)
```dart
notificationService.scheduleNotification(
  id: 2,
  title: 'Reminder',
  body: 'Don’t forget to drink water 💧',
  delay: Duration(seconds: 5),
);
```

### Cancel all notifications
```dart
notificationService.cancelAll();
```

---

## 7. Debug & troubleshooting

If notifications aren’t appearing:
1. Ensure `NotificationService().init()` is called before any notification.
2. Verify notification permissions in **Settings → Notifications**.
3. Check that `flutter_local_notifications` is properly imported in `AppDelegate.swift`.
4. Use `flutter logs` to inspect notification-related logs on Android.

---

## Conclusion

By isolating notification logic in a dedicated service, your code remains **clean, reusable, and scalable**.  
With this setup, you can easily:
- Show immediate or scheduled notifications  
- Manage iOS permissions  
- Centralize all notification logic in one place  

**Package:** [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications)

---

Written by Giorgio Giannotta — Mobile Developer
