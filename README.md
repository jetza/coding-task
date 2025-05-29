# Act+Acre

Modern webshop demo for cosmetic products, focused on beautiful, responsive design, smooth animations, and simple cart logic.

## Technologies Used

- **HTML5**
- **CSS3** (Tailwind CSS)
- **JavaScript (ES6+)**
- **FontAwesome** (icons)
- **Parcel** (bundler)

## Key Features

- Product carousel with animated add-to-cart button
- Product counter and purchase type selection (one-time or subscription)
- Responsive design for mobile and desktop
- Hamburger menu for mobile
- Accordion sections for additional info
- Button and cart animations
- Cart item count stored in localStorage (no backend)
- Modular JavaScript codebase (each feature in its own file)

## Getting Started

1. **Clone the repository or download the files**
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npx parcel src/index.html
   ```
4. Open `http://localhost:1234` (or the port shown in your terminal) in your browser.

## Project Structure

```
index.html                # Main page
src/
  script.js               # Main entry point, imports and initializes all features
  output.css              # Tailwind CSS build output
  custom.css              # Custom styles
  core/selectors.js       # Centralized DOM selectors
  core/features/          # (Legacy) Modular JS features
  features/               # Modular JS features (recommended)
    accordion/            # Accordion logic
    carousel/             # Carousel logic
    cart/                 # Cart logic (actions, storage, badge)
    icons/                # Icon assignment logic
    menu/                 # Mobile menu logic
    search/               # Search modal logic
    i18n/                 # i18next initialization
    pages/                # Subpages (blog, shop, user, etc.)
public/                   # Images, icons, fonts, locales
```

- All interactivity and logic is now modularized in `src/features/`.
- `src/script.js` is the main entry point that imports and initializes all features.
- `output.css` is the generated Tailwind CSS file.
- `custom.css` contains any custom styles.

## Notes

- This project is a demo and does not use a backend or real database. All cart data is stored locally in the browser (localStorage).
- You can extend the project by adding new features as separate modules in `src/features/`.
- For translations, see `public/locales/` and `src/i18n/i18next.js`.

---

For questions or suggestions, feel free to open an issue or contact the author.
