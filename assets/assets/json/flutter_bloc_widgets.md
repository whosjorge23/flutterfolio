# Mastering Flutter BLoC Widgets  
## Understanding `BlocProvider`, `BlocBuilder`, `BlocListener`, `BlocConsumer`, and `BlocSelector`

When working with **BLoC (Business Logic Component)** in Flutter, it’s easy to get lost among the various widgets that help you connect your UI with your state management logic.  
In this article, we’ll break down **each BLoC widget**, explaining what it does, when to use it, and showing practical examples.

---

## 1. `BlocProvider`

`BlocProvider` is the entry point for injecting your Cubit or Bloc into the widget tree.  
It allows all child widgets to access the same Bloc instance through `context.read<T>()` or `context.watch<T>()`.

### When to use it
- When you want to **create** or **provide** a Bloc/Cubit instance to descendant widgets.
- Typically placed high in the widget tree (e.g., at the screen or app level).

> Normally I place it in the GoRouter route of the Screen

### Example
```dart
BlocProvider(
  create: (context) => CounterCubit(),
  child: CounterPage(),
);
```

Inside `CounterPage`, you can access it with:
```dart
final counterCubit = context.read<CounterCubit>();
//Gets the cubit once and does not rebuild the widget when the state changes.
```
or 
```dart
final counterCubit = context.watch<CounterCubit>();
//Gets the cubit and rebuilds the widget every time the state changes.
```
In short: use `read` to act, use `watch` to react.

---

## 2. `BlocBuilder`

`BlocBuilder` is a widget that **rebuilds** part of your UI whenever the Bloc’s **state changes**.

### When to use it
- To **reactively rebuild** widgets based on the current state.
- It should only rebuild **small parts** of your UI for performance efficiency.

### Example
```dart
BlocBuilder<CounterCubit, int>(
  builder: (context, count) {
    return Text(
      '$count',
      style: TextStyle(fontSize: 32),
    );
  },
);
```

 **Tip:**  
Use `BlocBuilder` only for UI updates. If you need to perform a side effect (like showing a Snackbar), use `BlocListener` instead.

---

## 3. `BlocListener`

`BlocListener` listens to state changes **without rebuilding the UI**.  
It’s perfect for **side effects** like navigation, showing dialogs, or Snackbars.

### When to use it
- When you want to **listen for a specific state change** and perform an action once.
- It doesn’t rebuild — only triggers a callback.

### Example
```dart
BlocListener<LoginCubit, LoginState>(
  listener: (context, state) {
    if (state is LoginSuccess) {
      Navigator.pushNamed(context, '/home');
    } else if (state is LoginError) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(state.message)));
    }
  },
  child: LoginForm(),
);
```

 **Tip:**  
You can use `listenWhen` to listen only when certain conditions are met:
```dart
listenWhen: (previous, current) => current is LoginError,
```

---

## 4. `BlocConsumer`

`BlocConsumer` is a **combination** of `BlocBuilder` and `BlocListener`.  
It both **builds the UI** and **listens for side effects**.

### When to use it
- When you want to both **rebuild** the UI and **perform side effects** based on the same Bloc.

### Example
```dart
BlocConsumer<LoginCubit, LoginState>(
  listener: (context, state) {
    if (state is LoginSuccess) {
      Navigator.pushNamed(context, '/home');
    }
  },
  builder: (context, state) {
    if (state is LoginLoading) {
      return const CircularProgressIndicator();
    } else if (state is LoginError) {
      return Text('Error: ${state.message}');
    }
    return LoginButton();
  },
);
```

 **Tip:**  
Use `BlocConsumer` to avoid nesting `BlocBuilder` and `BlocListener` together.

---

## 5. `BlocSelector`

`BlocSelector` allows you to **listen to only a specific part** of the Bloc’s state.  
It helps reduce unnecessary rebuilds when your widget only depends on one property.

### When to use it
- When your Bloc’s state is complex, and you only need **one field** or **derived value**.

### Example
Suppose your state looks like this:
```dart
class ProfileState {
  final String name;
  final int age;
  final bool isLoading;

  ProfileState({required this.name, required this.age, required this.isLoading});
}
```

You can select only one property:
```dart
BlocSelector<ProfileCubit, ProfileState, bool>(
  selector: (state) => state.isLoading,
  builder: (context, isLoading) {
    return isLoading
        ? const CircularProgressIndicator()
        : const Text('Profile Loaded');
  },
);
```

 **Tip:**  
`BlocSelector` is ideal for **performance optimization** in large UIs.

---

## Summary Table

| Widget | Purpose | Triggers UI Rebuild? | Handles Side Effects? | Typical Use Case |
|--------|----------|---------------------|------------------------|------------------|
| **BlocProvider** | Provides Bloc/Cubit instance | ❌ | ❌ | Injecting Bloc into widget tree |
| **BlocBuilder** | Builds UI based on state | ✅ | ❌ | Updating UI when state changes |
| **BlocListener** | Responds to state changes | ❌ | ✅ | Navigation, Snackbars, dialogs |
| **BlocConsumer** | Combines Builder + Listener | ✅ | ✅ | UI + side effects in one place |
| **BlocSelector** | Listens to part of the state | ✅ (partially) | ❌ | Optimize rebuilds |

---

## Example Putting It All Together

```dart
BlocProvider(
  create: (_) => CounterCubit(),
  child: BlocConsumer<CounterCubit, int>(
    listener: (context, count) {
      if (count == 10) {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text('You reached 10!')));
      }
    },
    builder: (context, count) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Count: $count', style: TextStyle(fontSize: 32)),
          ElevatedButton(
            onPressed: () => context.read<CounterCubit>().increment(),
            child: const Text('Increment'),
          ),
        ],
      );
    },
  ),
);
```

---

## Conclusion

Each BLoC widget has its role:

- Use **BlocProvider** to inject your Bloc.  
- Use **BlocBuilder** to rebuild UI reactively.  
- Use **BlocListener** for one-time actions.  
- Use **BlocConsumer** to combine both.  
- Use **BlocSelector** for fine-grained rebuild control.

Mastering these widgets helps you build clean, efficient, and scalable Flutter apps with predictable behavior.

---

Written by Giorgio Giannotta — Mobile Developer
