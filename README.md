# Kittens Random Images Website

This is a simple React.js project that generates random kitten images. Users can like the images, which are then saved to local storage and shown in a sliding sidebar. The app also plays cute meow sounds when interacting with the UI.

---

## Project Structure

/src ├── App.js // Main app component that renders Header and Generator ├── Header.js // Displays the header with the logo and sidebar toggle ├── Generator.js // Handles image generation, liking, and audio ├── data.json // Local JSON file containing kitten image URLs ├── App.css // Global styles ├── Header.css // Styles for the header and navigation ├── Sidebar.css // Styles for the animated sidebar └── Generator.css // Styles for the image generator and floating hearts

---

## Key Features

- **Random Image Generator:** Click the image or the refresh button to see a new kitten.
- **Like Images:** Save your favorite kitten images to local storage. Liked images appear in a sliding sidebar.
- **Interactive UI:** Enjoy meow sounds and floating heart animations on interactions.

---

## How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/andradebyte/Kittens-Generator-Website.git
   cd Kittens-Generator-Website
2. **Install and run dependencies:**
   ```bash
   npm install
   npm start dev
