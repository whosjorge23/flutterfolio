# Navigation in Flutter with GoRouter  
### Including `extra`, `queryParams`, and `ShellRoute` for advanced routing

When building modern Flutter apps, **navigation** quickly becomes complex — especially when handling deep links, nested navigation, and state passing between screens.  
Thankfully, the [`go_router`](https://pub.dev/packages/go_router) package provides a **declarative, URL-based navigation system** that simplifies it all.

In this article, we’ll explore:
- How to configure `GoRouter`
- How to pass data with `extra` and `queryParams`
- How to use `ShellRoute` for layouts with persistent navigation bars

---

## Why GoRouter?

`GoRouter` is the **official Flutter navigation solution** supported by the Flutter team.  
It allows you to:
- Use URL-based routes (perfect for Flutter Web)
- Handle deep linking easily
- Pass data cleanly between screens
- Structure nested navigation

---

## Basic Setup

Add `go_router` to your `pubspec.yaml`:

```yaml
dependencies:
  go_router: ^14.0.0
```

Then import it:

```dart
import 'package:go_router/go_router.dart';
```

Let’s define a simple router with three routes:

```dart
final GoRouter router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomePage(),
    ),
    GoRoute(
      path: '/details',
      builder: (context, state) { 
      Map<String, dynamic> data = state.extra as Map<String, dynamic>;
      const DetailsPage(data: data);
      },
    ),
     GoRoute(
      path: '/portfolio',
      builder: (context, state) { 
      String? id =
              state.uri.queryParameters['id'];
      const PortfolioPage(id: id);
      },
    ),
  ],
);
```

Finally, provide the router to your app:

```dart
MaterialApp.router(
  routerConfig: router,
);
```

---

## Passing Data Between Screens

### Using `extra`

`extra` is perfect for passing **objects or complex data** between routes.

```dart
// Navigate with extra data
context.go('/details', extra: {'id': 34, 'name': 'John Doe'}); 
//Use go when you want to start a route to the stack and clean the previous one

context.push('/details', extra: {'id': 34, 'name': 'John Doe'}); 
//Use push when you want to add a route to the stack
```

Then, in your destination page:

```dart
class DetailsPage extends StatelessWidget {
  const DetailsPage({super.key, this.data});
  
  final Map<String, dynamic>? data;
  
  @override
  Widget build(BuildContext context) {
    

    return Scaffold(
      appBar: AppBar(title: const Text('Details')),
      body: Center(
        child: Text('ID: ${data?['id']}, Name: ${data?['name']}'),
      ),
    );
  }
}
```

**Use `extra`** when you want to pass non-string data like models or maps.  
It’s similar to pushing arguments in traditional navigation, but works seamlessly across web, mobile, and desktop.

---

### Using `queryParams`

`queryParams` are appended to the route’s URL — great for **shareable and deep links**.

#### The simple way

You can use string interpolation directly:

```dart
context.go('/portfolio?id=${4}');
```

Then in your page:

```dart
class PortfolioPage extends StatelessWidget {
  const PortfolioPage({super.key, required this.id});
  
  final String id;
  
  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      appBar: AppBar(title: const Text('Portfolio')),
      body: Center(
        child: Text('Portfolio ID: $id'),
      ),
    );
  }
}
```
---

## Using `ShellRoute` for Persistent Navigation

`ShellRoute` lets you define a **shared layout** (like a bottom navigation bar) that wraps multiple child routes.

```dart
final GoRouter router = GoRouter(
  routes: [
    ShellRoute(
      builder: (context, state, child) {
        return Scaffold(
          body: child,
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: _calculateIndex(state.location),
            onTap: (index) {
              switch (index) {
                case 0:
                  context.go('/home');
                  break;
                case 1:
                  context.go('/settings');
                  break;
              }
            },
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.home),
                label: 'Home',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.settings),
                label: 'Settings',
              ),
            ],
          ),
        );
      },
      routes: [
        GoRoute(
          path: '/home',
          builder: (context, state) => const HomePage(),
        ),
        GoRoute(
          path: '/settings',
          builder: (context, state) => const SettingsPage(),
        ),
      ],
    ),
  ],
);

int _calculateIndex(String location) {
  if (location.startsWith('/settings')) return 1;
  return 0;
}
```

This way, your bottom navigation bar **stays visible while switching tabs**, and each route maintains its own navigation history.

---

## Combining Everything

You can combine `ShellRoute`, `queryParams`, and `extra` in the same router for complex apps:

```dart
final router = GoRouter(
  routes: [
    ShellRoute(
      builder: (context, state, child) => AppScaffold(child: child),
      routes: [
        GoRoute(
          path: '/profile',
          builder: (context, state) {
            final userId = state.uri.queryParameters['id'];
            final data = state.extra as Map<String, dynamic>?;
            return ProfilePage(userId: userId, extraData: data);
          },
        ),
      ],
    ),
  ],
);
```

Now you can navigate like this:

```dart
context.go(
  Uri(path: '/profile?id${123}',
  extra: {'age': '30', 'city': 'New York'},
);
```

---

## Summary

| Feature | Description | Use Case |
|----------|--------------|----------|
| `extra` | Pass complex objects | Model data, local state |
| `queryParams` | Pass URL-safe strings | Deep links, filters |
| `ShellRoute` | Persistent layout container | Tabs, sidebars, nav bars |

---

## Conclusion

`GoRouter` makes Flutter navigation **clean, declarative, and scalable**.  
Once you start using `extra`, `queryParams`, and `ShellRoute`, you’ll notice how much simpler your app structure becomes — especially for large, multi-page projects.

Whether you’re building a **single-page web app** or a **multi-screen mobile app**, Know how to use `GoRouter` is one of the best investments you can make as a Flutter developer.

---

Written by Giorgio Giannotta — Mobile Developer

