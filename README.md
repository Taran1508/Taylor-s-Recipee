# Taylor's Recipee

Taylor's Recipee is a single-page application (SPA) for discovering meals by ingredient. It leverages **TheMealDB API** to fetch recipes and allows users to browse details instantly. The app demonstrates modern React patterns, caching strategies, accessibility, and performance optimizations.

---

## **Tech Stack**

- **Frontend**: React 18 + TypeScript
- **Bundler/Dev Server**: Vite
- **Styling**: Tailwind CSS
- **Data Fetching & Caching**: React Query (@tanstack/react-query)
- **Testing**: Vitest (unit/integration), React Testing Library
- **Performance Auditing**: Lighthouse
- **Deployment**: Stackblitz

---

## **Setup Instructions**

1. Clone the repository (or fork).
2. Navigate to the project folder:

   ```bash
   cd recipe-ideas
   ```

3. Install dependencies:

   ```bash
   npm i
   ```

4. Create a `.env` file in the root

   ```
   VITE_API_URL=https://www.themealdb.com/api/json/v1/1
   ```

---

## **Run / Build / Preview**

- **Development Server**:
  ```bash
  npm run dev
  ```
  Open `http://localhost:5173` in your browser.
- **Production Build**:
  ```bash
  npm run build
  npm run preview
  ```
- **Type Checking**:
  ```bash
  npm run typecheck
  ```
- **Unit / Integration Tests**:
  ```bash
  npm run test
  ```

---

## **Deployment to Stackblitz**

1. Go to Stackblitz.
2. Click **Create New Project → From GitHub**.
3. Paste your repository URL and authorize access.
4. Stackblitz detects `package.json` and installs dependencies automatically.
5. The dev server runs automatically; preview your SPA live in Stackblitz.
6. Optional: Share your Stackblitz URL with the instructor or team.

**Notes:**

- Environment variables are automatically injected if using `.env` in Stackblitz.
- Stackblitz handles static hosting; no additional backend required.

---

## **Documentation / Notes**

- **Caching**: React Query caches results (staleTime 5min, cacheTime 15min). Prefetch details on hover for instant modal opening.
- **Debounce**: Search input debounced at 400ms to avoid unnecessary API calls.
- **Accessibility**: Keyboard navigation for grid & modal, ARIA labels, focus trap in modal.
- **Edge Cases**: Empty state, offline last searches persisted in localStorage, fallback images for broken thumbnails.
- **Performance**: Lazy-loaded images and virtualized grid for long lists. Lighthouse audit: Performance 80, Accessibility 95+, Best Practices 90+.
- **Type Checking:** All components and hooks are fully typed with TypeScript. Run `npm run typecheck` (`tsc --noEmit`) to ensure type safety across the project.

## **Features**

- Ingredient-based search with debounced input.
- Recipe grid with lazy-loaded images and skeleton loaders.
- Recipe detail modal with ingredients, instructions, and video link.
- Prefetching of recipe details on hover for instant modal display.
- URL sync for deep-linkable searches.
- Recent searches and quick-pick ingredient chips.

---

## **Accessibility & Performance**

- Keyboard navigation for grid & modal.
- Focus trap for modals.
- ARIA labels on chips and buttons.
- Lighthouse scores:
  - Performance: ~80
  - Accessibility: >95
  - Best Practices: >90

---

## **Known Limitations / Notes**

- The free TheMealDB API supports single-ingredient searches only.
- Multi-ingredient filtering is simulated client-side (intersection of results).
- Cooking time filtering not available in free API.
- Offline results limited to last searches stored in LocalStorage.

## **ChatGPT Reference**

- Placeholder for conversation link(s): [https://chatgpt.com/share/68b029ee-36dc-800d-9a54-2eadf9f67a04]()
- Prompts used:
  - Initial HLA, LLD, architecture planning
  - React Query caching strategies
  - Recipe modal and grid implementation
  - Stackblitz deployment guidance
