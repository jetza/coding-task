# Cosmetic Products Webshop

This is a modern single-page webshop for cosmetic products, developed as a demo/project with a focus on beautiful and responsive design, animations, and simple cart logic.

## Technologies Used

- **HTML5**
- **CSS3** (Tailwind CSS)
- **JavaScript (ES6+)**
- **FontAwesome** (icons)

## Key Features

- Product carousel with animated add-to-cart button
- Product counter and purchase type selection (one-time or subscription)
- Responsive design for mobile and desktop devices
- Hamburger menu for mobile
- Accordion sections for additional information
- Button and cart animations
- Cart item count stored in localStorage

## Getting Started

1. **Clone the repository or download the files**
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server (recommended):
   ```sh
   npx parcel src/index.html
   ```
4. Open `http://localhost:3000` (or the port you get) in your browser.

## About Parcel

You can use [Parcel](https://parceljs.org/) as a zero-config development server and bundler. Parcel automatically reloads the page on changes, supports modern JS features, and bundles your code for production. To use it, run:

```sh
npx parcel src/index.html
```

This is recommended for a smoother development experience.

## Project Structure

- `src/index.html` — Main page
- `src/index.js` — All interactivity and logic
- `src/styles/tailwind.css` — Tailwind CSS styles
- `src/assets/` — Images and other resources (optional)
- `src/pages/` — Prepared pages for extension (blog, shop, user...)

## Note

This project is a demo and does not use a backend or a real database. All cart data is stored locally in the browser (localStorage).

---

For questions or suggestions, feel free to open an issue or contact the author.
