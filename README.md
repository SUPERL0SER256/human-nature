# Human Nature

An interactive, cinematic web experience that explores human emotions and concepts. 

## Overview
**Human Nature** is a front-end web application that uses your device's camera to scan physical cards (via QR codes). Upon scanning, the application triggers a beautiful, cinematic reveal sequence:
1. **The Emotion**: A concept (e.g., *Joy*, *Grief*, *Ambition*) is elegantly typed out with a letter-by-letter blur reveal.
2. **The Visual**: A breathtaking visual representation fades in, framed over a dynamically blurred ambient backdrop.
3. **The Prompt**: The user is presented with a thought-provoking question for self-reflection (e.g., *"When did you last feel joy?"*).

The project also features a **Masonry Gallery** where users can view the entire collection of emotions and images in an organic, staggered grid.

## Features
- **Live QR Scanning**: Built-in webcam support using `jsQR` for instantaneous card recognition.
- **Cinematic Typography & Animations**: Utilizes Google Fonts (*Cinzel* and *Montserrat*) paired with custom CSS `@keyframes` for smooth, theatrical transitions.
- **Responsive Masonry Gallery**: A dynamic CSS column layout that retains original image aspect ratios while providing gorgeous hover effects.
- **Zero Dependencies**: Pure HTML, CSS, and Vanilla JavaScript for maximum performance and easy deployment.

## Usage
Simply allow camera permissions when prompted, hold up a designated QR code card to the camera, and watch the experience unfold. Press the `R` key at any time to reload the experience, or click the grid icon (`▦`) to view all concepts in the gallery.
