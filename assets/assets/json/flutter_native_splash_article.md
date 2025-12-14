# How to Create a Professional Splash Screen in Flutter with *flutter_native_splash*

When building a Flutter app, the first visual impression matters. Before the `MaterialApp` widget even loads, users see the **native splash screen**—the initial screen shown by iOS and Android while the app starts up.

Flutter provides an official, simple plugin to generate clean, consistent, **native** splash screens:  
**`flutter_native_splash`**

## Why Use a Native Splash Screen?

Flutter cannot display widgets instantly at startup. Without a custom splash screen, users will see:

- A white screen (Android)  
- A blank default screen (iOS)

With `flutter_native_splash`, you can:

- Show a logo immediately on launch  
- Customize colors and layout  
- Support light/dark mode  
- Generate all screen densities automatically  
- Avoid writing native code in Kotlin/Swift

## Installation

```yaml
dev_dependencies:
  flutter_native_splash: ^2.4.0
```

```sh
flutter pub get
```

## Basic Configuration

```yaml
flutter_native_splash:
  color: "#ffffff"
  image: assets/splash/logo.png
```

Add assets:

```yaml
flutter:
  assets:
    - assets/splash/
```

Generate:

```sh
flutter pub run flutter_native_splash:create
```

## Light & Dark Mode Support

```yaml
flutter_native_splash:
  color: "#ffffff"
  image: assets/splash/light_logo.png

  color_dark: "#000000"
  image_dark: assets/splash/dark_logo.png
```

## Advanced Customization

### Scale the logo

```yaml
flutter_native_splash:
  android_image_scale: 1.8
  ios_image_scale: 2
```

## Full Example

```yaml
flutter_native_splash:
  color: "#F3F6F9"
  image: assets/splash/logo.png

  color_dark: "#0E0E0E"
  image_dark: assets/splash/logo_dark.png

  android: true
  ios: true
  web: false

  android_gravity: center
  ios_content_mode: scaleAspectFit

  branding: assets/splash/branding.png
  branding_dark: assets/splash/branding_dark.png
```

## Clean & Regenerate

```sh
flutter clean
flutter pub run flutter_native_splash:remove
flutter pub run flutter_native_splash:create
```

## Common Issues

| Issue | Reason | Fix |
|-------|--------|------|
| Splash not updating | Flutter caching | Run `flutter clean` |
| Image cut off | Wrong proportions | Use 1024×1024 PNG |
| Branding differences | iOS handles it differently | Expect slight variations |

## Final Thoughts

`flutter_native_splash` allows you to create professional, native splash screens with zero Kotlin/Swift code.

---

Written by Giorgio Giannotta — Mobile Developer