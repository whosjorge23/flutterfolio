# Mastering Cubit for Flutter State Management

Flutter developers often need a clean way to manage app state. Cubit is a lightweight part of the BLoC (Business Logic Component) ecosystem that provides a simple, method‑driven approach to state management. This guide walks you through using Cubit effectively.

## Step 1: Understand What Cubit Is

A **Cubit** is a class that encloses an observable state. Unlike traditional BLoCs, Cubit does not rely on events; instead, it exposes methods that directly emit new states. This makes the API simple and less verbose. A Medium article notes that Cubit is a lighter alternative within the BLoC pattern and offers a more straightforward approach to state changes. Another guide describes Cubit as a lightweight state management solution where state changes are invoked directly by calling methods.

Why choose Cubit?

- **Simpler API** – fewer moving parts compared to full BLoC.  
- **Lightweight** – ideal for small to medium‑sized apps.  
- **Gentler learning curve** – beginners can grasp the concept quickly.  

## Step 2: Install the `flutter_bloc` Package

To start using Cubit, add the `flutter_bloc` package to your `pubspec.yaml`:

```yaml
dependencies:
  flutter_bloc: ^8.1.3
```

This package provides both BLoC and Cubit classes. After adding the dependency, run:

```bash
flutter pub get
```

## Step 3: Create a Cubit

Create a Dart file (e.g., `counter_cubit.dart`) and define your Cubit class by extending `Cubit<State>` from the package. The class should have an initial state and methods that emit new states.

```dart
import 'package:flutter_bloc/flutter_bloc.dart';

// Define the state; for a counter it can simply be an int.
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);

  // Method to increment the counter
  void increment() => emit(state + 1);

  // Method to decrement the counter
  void decrement() => emit(state - 1);
}
```

The important part is that your methods call `emit(newState)` directly. Cubit does not need events or a `mapEventToState` function as BLoC does.

## Step 4: Provide the Cubit to the Widget Tree

Use `BlocProvider` (from `flutter_bloc`) to make the Cubit available to your widgets. Wrap the part of your widget tree that needs access to the Cubit:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => CounterCubit(),
      child: MaterialApp(
        title: 'Cubit Demo',
        home: CounterPage(),
      ),
    );
  }
}
```

Inside your UI, use `BlocBuilder` to rebuild the widget in response to state changes:

```dart
class CounterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Cubit Counter')),
      body: Center(
        child: BlocBuilder<CounterCubit, int>(
          builder: (context, count) {
            return Text('$count');
          },
        ),
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            heroTag: 'increment',
            onPressed: () => context.read<CounterCubit>().increment(),
            child: Icon(Icons.add),
          ),
          SizedBox(height: 8),
          FloatingActionButton(
            heroTag: 'decrement',
            onPressed: () => context.read<CounterCubit>().decrement(),
            child: Icon(Icons.remove),
          ),
        ],
      ),
    );
  }
}
```

`BlocBuilder` listens to state changes from your Cubit and rebuilds the UI when a new state is emitted.

## Step 5: Compare Cubit to BLoC

Both Cubit and BLoC come from the same package. However, they differ in how state changes are triggered. BLoC uses an event‑driven model with separate event and state classes; Cubit uses method calls. A blog post summarised this distinction by noting that BLoC has more boilerplate and a steeper learning curve, whereas Cubit is lighter and easier to grasp.

### Cubit vs BLoC Overview

| Feature           | BLoC                                   | Cubit                         |
|-------------------|----------------------------------------|-------------------------------|
| Architecture      | Event‑driven                           | Method‑based                  |
| Complexity        | More complex; many event/state classes | Simpler API                   |
| Boilerplate       | Higher (events + mappings)             | Less code                     |
| Learning Curve    | Steeper                                | Gentler                       |
| Ideal Use‑Case    | Complex features, event queues         | Simple to medium‑sized UIs    |
| Debugging         | Event history for state transitions    | No event history (methods)    |

Choose Cubit when you want to manage straightforward UI states or when you need rapid prototyping with minimal boilerplate. For complex flows requiring event queues and explicit separation of input and state, BLoC may be more appropriate.

## Conclusion

Cubit provides a streamlined way to handle state in Flutter apps. By eliminating events and focusing on direct method calls to emit new states, Cubit reduces boilerplate and lowers the learning curve, making it a solid choice for many Flutter projects. Integrating Cubit is straightforward: install `flutter_bloc`, define your Cubit class, provide it to the widget tree, and use `BlocBuilder` to rebuild the UI when the state changes. Understanding this lightweight state management solution will help you build cleaner, more maintainable Flutter apps.

---

Written by Giorgio Giannotta — Mobile Developer