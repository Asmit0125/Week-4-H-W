# Image Slider Library

A responsive, looping image slider built with vanilla HTML, CSS, and JavaScript.

## Run locally
1. Download or clone this folder.
2. Open `index.html` in a modern browser. For best results, use VS Code with the Live Server extension.
3. The demo images are loaded from Unsplash and therefore require an internet connection.

## Features
- Previous and next buttons
- Dynamically generated, accessible indicator dots
- Horizontal `transform: translateX()` transitions
- Directional infinite looping using cloned boundary slides
- Responsive aspect ratios and reduced-motion support
- Keyboard navigation with left/right arrow keys

## Files
- `index.html` — semantic page and slide markup
- `style.css` — responsive layout, controls, and motion
- `slider.js` — slider class, event handling, and index math
- `screenshots/` — source and output evidence used in the project report

## GitHub
Create a public repository on GitHub, then run these commands from this directory:

```bash
git init
git add .
git commit -m "Build responsive vanilla JavaScript image slider"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/image-slider-library.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. The repository is not published automatically by this package.
