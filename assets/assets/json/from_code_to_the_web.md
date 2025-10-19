# From Code to the Web: Deploying Your Flutter App on GitHub Pages
## A Step-by-Step Guide to Flutter Web Deployment

Flutter has evolved far beyond mobile development, it’s now a full-fledged solution for **multi-platform apps**, including the **web**. With Flutter Web and **WebAssembly (Wasm)** support, developers can build blazing-fast applications that run directly in the browser with near-native performance.

In this guide, we’ll go through how to **create a Flutter web project** and **deploy it on GitHub Pages** using the `flutter build web --wasm` command.

---

### Step 1: Create Your Flutter Web Project

If you don’t already have Flutter installed, head over to [flutter.dev](https://flutter.dev/docs/get-started/install) and set it up for your operating system.

Then, open your terminal and create a new Flutter project:

```bash
flutter create my_web_app
cd my_web_app
```

To verify that the web platform is enabled, run:

```bash
flutter devices
```

You should see something like:

```
Chrome (web) • chrome • web-javascript • Google Chrome 129.0
Edge (web)   • edge   • web-javascript • Microsoft Edge 129.0
```

If you don’t see any web devices, enable web support manually:

```bash
flutter config --enable-web
```

---

### Step 2: Run and Test Your App Locally

Before deployment, test your Flutter app locally:

```bash
flutter run -d chrome
```

This command launches the app in your browser so you can preview and debug it.

You now have a running **Flutter web app** built entirely in Dart — no JavaScript required.

---

### Step 3: Build for Production with WebAssembly

Flutter Web can be compiled in two ways:
- **JavaScript (default)** — broader compatibility, smaller size
- **WebAssembly (Wasm)** — faster execution, near-native performance

To build your project for deployment, use:

```bash
flutter build web --wasm --base-href /{your-repository-name}/
```

>  Replace `{your-repository-name}` with the actual name of your GitHub repository.
>>If you want your hostname just use `flutter build web --wasm --base-href /`.

This generates a `build/web` folder containing the optimized files for your website.

- The `--wasm` flag enables WebAssembly compilation (available from Flutter 3.22+).
- The `--base-href` flag ensures the app loads correctly when served from a subdirectory like GitHub Pages.

For example, if your repo is named `my_web_app`, the command would be:

```bash
flutter build web --wasm --base-href /my_web_app/
```

---

### Step 4: Initialize Git and Push to GitHub

If you haven’t already, initialize a Git repository and push your project:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/my_web_app.git
git push -u origin main
```

---

### Step 5: Deploy on GitHub Pages

You have two main ways to deploy: manually or using GitHub Actions.

#### Option 1 — Manual Deployment

1. Go to your repository on GitHub.
2. Create a new branch named `gh-pages`:

   ```bash
   git checkout -b gh-pages
   ```
3. Delete everything except the contents of `build/web`:

   ```bash
   rm -rf !(build)
   mv build/web/* .
   rm -rf build
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

4. In your GitHub repository, go to:  
   **Settings → Pages → Source → Branch: gh-pages → / (root)**

Your app will be live at:  
`https://your-username.github.io/my_web_app/`

---

### Pro Tip: Custom Domain Support

If you have a custom domain (e.g., `myapp.dev`), just use `flutter build web --wasm --base-href /`. And add a file named `CNAME` inside `build/web/` before pushing:

```
myapp.dev
```

GitHub Pages will serve your Flutter web app under your custom domain.

---

### Conclusion

In just a few steps, you’ve gone from a blank Flutter project to a **fully deployed web app** hosted on **GitHub Pages**: free, fast, and version-controlled.

With the `--wasm` build option, your Flutter web apps run smoother than ever, bringing native-level performance to the browser.

**A single codebase, one command, and your app is online.**  
Welcome to the future of web development, powered by Flutter. 

---

Written by Giorgio Giannotta — Mobile Developer
