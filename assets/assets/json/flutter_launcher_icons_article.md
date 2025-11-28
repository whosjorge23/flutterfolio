# How to Use `flutter_launcher_icons` to Generate App Icons in Flutter

App icons are the first visual element users see on their devices and in app stores. Setting them up manually can be time‑consuming and error‑prone—especially when creating dozens of icon sizes for iOS and Android.

Fortunately, Flutter provides an excellent tool to automate this task: **flutter_launcher_icons**.

This article explains how the plugin works, how to configure it, and common pitfalls to avoid.

---

## What Does `flutter_launcher_icons` Do?

`flutter_launcher_icons` automatically generates all the required app icon sizes for both **iOS** and **Android**, based on a single source image.

It handles:
- generating icons in all required dimensions  
- placing them in the correct platform folders  
- updating platform configuration files  
- supporting adaptive icons for Android  
- ensuring consistency across platforms  

---

## Installing the Plugin

Add the plugin under **dev_dependencies**:

```yaml
dev_dependencies:
  flutter_launcher_icons: ^0.14.1
```

Add the base configuration:

```yaml
flutter_icons:
  android: true
  ios: true
  image_path: "assets/icon/app_icon.png"
```

Run:

```sh
flutter pub get
```

---

## Preparing Your Icon

Use a high‑resolution PNG image:

- Recommended size: **1024×1024**
- Background: solid color (iOS does not support transparency)
- Avoid tiny details (they won’t scale well)

---

## Full Configuration Example

```yaml
flutter_icons:
  android: true
  ios: true
  min_sdk_android: 21
  image_path: "assets/icon/app_icon.png"
  adaptive_icon_background: "#FFFFFF"
  adaptive_icon_foreground: "assets/icon/foreground.png"
```

### Explanation of Options

| Option | Description |
|--------|-------------|
| `android` | Enable Android icon generation |
| `ios` | Enable iOS icon generation |
| `image_path` | Base PNG image |
| `adaptive_icon_background` | Solid color or PNG for Android adaptive icons |
| `adaptive_icon_foreground` | Foreground PNG for adaptive icons |
| `min_sdk_android` | Required when using adaptive icons |

---

## Generate the Icons

Run:

```sh
flutter pub run flutter_launcher_icons
```

Or the Dart version:

```sh
dart run flutter_launcher_icons
```

The plugin will generate:

- Android → `android/app/src/main/res/...`
- iOS → `ios/Runner/Assets.xcassets/AppIcon.appiconset/...`

---

## Adaptive Icons (Android)

Adaptive icons are modern, responsive icons introduced in Android Oreo.  
They improve:

- animations in app switcher  
- launcher shape consistency  
- general visual appearance  

Example configuration:

```yaml
flutter_icons:
  android: true
  image_path_android: "assets/icon/main.png"
  adaptive_icon_foreground: "assets/icon/fg.png"
  adaptive_icon_background: "#000000"
```

---

## Updating Icons

Every time you modify the image:

```sh
dart run flutter_launcher_icons
```

Optional clean (if icons appear outdated):

```sh
flutter clean
dart run flutter_launcher_icons
```

---

## Common Issues

### Error: “Adaptive icon background must be a color or image”
You cannot use both at the same time.

### Error: “Image not found”
Verify the image path and ensure the file is included in your assets directory.

### Icons not changing
Cleaning the project often fixes this:

```sh
flutter clean
```

---

## Tips for Professional Apps

- Always keep a master **1024x1024** PNG file  
- Use separate icons for dev/prod flavors  
- Test icons on **physical devices**, not just emulators  
- Use adaptive icons for Android for a modern look  

---

## Conclusion

`flutter_launcher_icons` is a must‑have plugin for every Flutter developer. It eliminates manual work and ensures your app icons look perfect across all platforms.

If you want, I can also:
- Create a version of this article optimized for SEO  
- Add images and diagrams  
- Write a companion article on Flutter flavors and naming conventions

---

Written by Giorgio Giannotta — Mobile Developer