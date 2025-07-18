# Building a Custom Flutter Widget from Scratch

📅 Published on: **2025-07-12**

---

## Introduction

Sometimes, Flutter’s built-in widgets aren't enough. Creating **custom widgets** allows you to encapsulate both functionality and styling for reuse across your app.

In this article, we’ll walk through building a **custom button widget** that supports icons, labels, and loading states. Along the way, you'll learn:

- When to use `StatelessWidget` vs `StatefulWidget`
- How to use constructor parameters
- How to make your widget easily configurable via themes

---

## Why Build a Custom Widget?

Flutter offers many flexible widgets, but your app may need something tailored:
- A button with a loading spinner
- A special card layout with reusable styles
- A widget that simplifies repeated logic

Instead of duplicating code, you can build one custom widget and reuse it wherever needed.

---

## Step 1: Define Your Widget

We’ll create a `CustomButton` widget that accepts:

- `label` (required)
- `icon` (optional)
- `isLoading` (optional)
- `onPressed` callback

```dart
class CustomButton extends StatelessWidget {
  final String label;
  final IconData? icon;
  final bool isLoading;
  final VoidCallback onPressed;

  const CustomButton({
    required this.label,
    required this.onPressed,
    this.icon,
    this.isLoading = false,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: isLoading ? null : onPressed,
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      child: isLoading
          ? const SizedBox(
              height: 16,
              width: 16,
              child: CircularProgressIndicator(strokeWidth: 2),
            )
          : Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (icon != null) ...[
                  Icon(icon, size: 18),
                  const SizedBox(width: 8),
                ],
                Text(label),
              ],
            ),
    );
  }
}
```

---

## Step 2: Using Your Custom Widget

Now you can use `CustomButton` anywhere in your app:

```dart
CustomButton(
  label: 'Submit',
  icon: Icons.check,
  onPressed: () {
    // Handle submit action
  },
),
```

You can also show a loading state:

```dart
CustomButton(
  label: 'Loading...',
  isLoading: true,
  onPressed: () {},
),
```

---

## Conclusion

Creating custom widgets in Flutter is straightforward and powerful. It allows you to encapsulate functionality, improve code reuse, and maintain a consistent design across your app. As you build more complex UIs, consider how custom widgets can simplify your codebase.
