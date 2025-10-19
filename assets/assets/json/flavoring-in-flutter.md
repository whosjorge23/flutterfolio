# Flavoring in Flutter
## Managing Multiple Environments Like a Pro

When developing a Flutter app, we often need **multiple environments**:
- one for **development**
- one for **internal testing** (*staging*)
- one for **production**

Managing everything manually can get messy — and that’s where **Flutter flavors** come in.

---

## What Are Flavors?

*Flavors* allow you to create **different variants of the same app** with distinct configurations.  
Each flavor can have:
- a different **name and icon**
- a separate **package name / bundle ID**
- different **API endpoints** and **Firebase keys**
- custom **build variables**

In short, a flavor lets you compile *the same app* but with unique behaviors and configurations.

---

## Step-by-Step: Creating Flavors

### 1 Define Flavors in `flutter.gradle`

In your `android/app/build.gradle` file, add:

```gradle
flavorDimensions "app"
productFlavors {
    dev {
        dimension "app"
        applicationIdSuffix ".dev"
        versionNameSuffix "-dev"
    }
    staging {
        dimension "app"
        applicationIdSuffix ".staging"
        versionNameSuffix "-staging"
    }
    prod {
        dimension "app"
    }
}
```

---

### 2 Configure Flavors on iOS

Open Xcode → *Runner* → *Targets*.  
Duplicate the main target and rename them as:
- Runner Dev
- Runner Staging
- Runner Prod

Then edit the files under `ios/Runner/xcshareddata/xcschemes/` to add the corresponding schemes.

---

### 3 Create Dedicated Entry Points

Inside your `lib/` folder, create separate files:

```
lib/main_dev.dart
lib/main_staging.dart
lib/main_prod.dart
```

Each one should contain:

```dart
import 'package:my_app/main_common.dart';

void main() {
  mainCommon(Flavor.dev);
}
```

And in `main_common.dart`:

```dart
enum Flavor { dev, staging, prod }

late final Flavor flavor;

void mainCommon(Flavor flv) {
  flavor = flv;
  runApp(MyApp());
}
```

---

### 4 Use the Flavor in Your Code

You can access the `flavor` variable anywhere in your project:

```dart
String get apiBaseUrl {
  switch (flavor) {
    case Flavor.dev:
      return "https://api-dev.example.com";
    case Flavor.staging:
      return "https://api-staging.example.com";
    case Flavor.prod:
      return "https://api.example.com";
  }
}
```

---

## Bonus Tip: Integrate Flavors with Firebase

If you use Firebase, you can create a project for each flavor:
- `myapp-dev`
- `myapp-staging`
- `myapp-prod`

Then add the corresponding files:
```
android/app/src/dev/google-services.json
android/app/src/staging/google-services.json
android/app/src/prod/google-services.json
```

---

## How to Run a Flavor

To run a specific flavor:

```bash
flutter run --flavor dev -t lib/main_dev.dart
```

Or build dedicated versions:

```bash
flutter build apk --flavor prod -t lib/main_prod.dart
flutter build ios --flavor staging -t lib/main_staging.dart
```

---

## Conclusion

*Flavoring* in Flutter is an essential tool for teams and large-scale projects.  
It allows you to:
- keep your code clean and configurations separate
- test safely without touching production
- distribute customized builds efficiently

In short: **one codebase, multiple enviroments.**

---

Written by Giorgio Giannotta — Mobile Developer
