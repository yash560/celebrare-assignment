# 📸 Celebrare — Curated Photo Exhibition Web App

> **Frontend React Internship Technical Assessment**  
> **Candidate:** Yash Jain ([yaashjainn@gmail.com](mailto:yaashjainn@gmail.com) • [GitHub: @yash560](https://github.com/yash560))  
> **Company:** Celebrare (IIT Hyderabad Alumni Startup)  
> **Live Production Demo:** [https://celebrare-gallery.vercel.app](https://celebrare-gallery.vercel.app)  
> **Repository:** [https://github.com/yash560/celebrare-assignment](https://github.com/yash560/celebrare-assignment)

---

## 🌟 Executive Summary

This web application is a high-performance photo exhibition platform engineered from scratch strictly according to Celebrare's technical guidelines. The solution adheres to all seven functional requirements without any external UI component libraries (no MUI, no Ant Design, no Bootstrap), built with **React 19, Vite 6, TypeScript 5.7, and Tailwind CSS v4**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CELEBRARE PHOTO GALLERY                         │
├────────────────────────────────────────────────────────────────────────┤
│  [Logo: Celebrare]    [All Photos (30)]  [Favourites (X)]  [Dark Toggle] │
├────────────────────────────────────────────────────────────────────────┤
│  🔍 [ Search photos by author name...                      (12/30) [X] ] │
├────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │ [Photo 1] [♥]│  │ [Photo 2] [♥]│  │ [Photo 3] [♥]│  │ [Photo 4][♥]│ │
│  │ Alejandro E. │  │ Dan Freeman  │  │ Paul Jarvis  │  │ Lola Smith  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘ │
│  (Desktop: 4 Columns | Tablet: 2 Columns | Mobile: 1 Column)            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Requirements & Technical Implementation

| # | Requirement | Specification | Implementation in Codebase |
|---|---|---|---|
| **1** | **Project Setup** | React + Vite + Tailwind CSS. No external UI frameworks. | Clean React 19 + Vite + TypeScript + Tailwind CSS v4 with `@custom-variant dark`. |
| **2** | **Picsum API Integration** | Fetch 30 photos from `https://picsum.photos/v2/list?limit=30`. Show loading & error states. | Custom hook `useFetchPhotos` with loading shimmer skeletons, error banner, and retry capability. |
| **3** | **Responsive Grid** | Desktop: 4 cols (`lg:grid-cols-4`). Tablet: 2 cols (`sm:grid-cols-2`). Mobile: 1 col (`grid-cols-1`). | Tailwind CSS dynamic grid container with aspect-ratio locked photo cards. |
| **4** | **Real-Time Search Filter** | Search input at top filtering photos by author in real-time. No page reload. No search API calls. | Controlled search input with real-time substring matching, clear button, and empty state. |
| **5** | **Favourites via `useReducer`** | Heart icon toggles favourite. Manage state via `useReducer` (NOT `useState`). Must persist in `localStorage`. | `favouritesReducer` with `TOGGLE_FAVOURITE` action, lazy initialization, and immediate `localStorage` sync. |
| **6** | **Custom Hook** | Extract fetch logic into `useFetchPhotos`. Must return `{ photos, loading, error }`. Gallery uses hook. | `src/hooks/useFetchPhotos.ts` with `AbortController` cancellation to eliminate unmount memory leaks. |
| **7** | **`useCallback` + `useMemo`** | `useCallback` on search handler. `useMemo` on filtered photo list calculation. | `useCallback` for `handleSearchChange`, `useMemo` for `filteredPhotos`. |

---

## 🎙️ 5-Minute Technical Video Presentation Notes

### 1. Show the App Working
- **Loading State:** Shimmering skeleton cards pulse gracefully while Picsum API data is fetched.
- **Responsive Layout:** Automatically scales between 4 columns (desktop $\ge$ 1024px), 2 columns (tablet $\ge$ 640px), and 1 column (mobile $<$ 640px).
- **Search Filtering:** Typing an author name (e.g., `"Alejandro"` or `"Dan"`) filters the 30 loaded photos instantly with zero network requests.
- **Favourites Toggling:** Clicking any card's heart icon toggles its state (turns crimson fill), updates the navbar badge count, and reflects in the `"Favourites Only"` filter view.
- **Persistence Across Refresh:** Refreshing the browser preserves all favorited items through safe `localStorage` deserialization.
- **Dark Mode Support:** Class-based theme toggling with sharp contrast in both light and dark environments.

---

### 2. Custom Hook: `useFetchPhotos`
Located at [`src/hooks/useFetchPhotos.ts`](src/hooks/useFetchPhotos.ts):

```typescript
export function useFetchPhotos(): UseFetchPhotosReturn {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  // ...
  return { photos, loading, error, refetch }
}
```

- **What it returns:** An object containing `photos` (`Photo[]`), `loading` (`boolean`), `error` (`string | null`), and `refetch` (`() => void`).
- **Failure Behavior:** If the network goes offline or the server returns non-200 HTTP statuses, `error` is populated with a clear error string and `loading` is set to `false`. The UI renders a dedicated `ErrorMessage` banner with a `"Try Again"` button invoking `refetch()`.
- **Memory Safety:** Integrates `AbortController` inside the `useEffect` cleanup handler to cancel pending fetches if the component unmounts before response resolution.

---

### 3. Favourites State: `useReducer` vs `useState`
Located at [`src/reducers/favouritesReducer.ts`](src/reducers/favouritesReducer.ts):

```typescript
export function favouritesReducer(
  state: FavouritesState,
  action: FavouritesAction
): FavouritesState {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const exists = state.favourites.includes(action.payload)
      const nextFavourites = exists
        ? state.favourites.filter((id) => id !== action.payload)
        : [...state.favourites, action.payload]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavourites))
      return { ...state, favourites: nextFavourites }
    }
    // ...
  }
}
```

- **Actions Handled:**
  - `TOGGLE_FAVOURITE`: Toggles a photo ID into or out of the list.
  - `REMOVE_FAVOURITE`: Removes a specific photo ID.
  - `CLEAR_FAVOURITES`: Clears all favorites and purges storage.
  - `SET_FAVOURITES`: Resets or hydrates from an external array.
- **Why `useReducer` instead of `useState`?**
  1. **Decoupled Business Logic:** Rather than embedding conditional array manipulation and `localStorage` writes inside component event handlers, the update rules are isolated in a pure reducer function.
  2. **Predictable State Transitions:** Any state transition is explicitly dispatched via a typed action object, making state mutations predictable and auditable.
  3. **Lazy Hydration:** Handled via the 3rd argument `initFavouritesState`, which reads `localStorage` only on initial mount.

---

### 4. Performance Hooks: `useCallback` & `useMemo`
Located at [`src/components/Gallery.tsx`](src/components/Gallery.tsx):

#### `useCallback` on Search Handler:
```typescript
const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value)
}, [])
```
- **Problem it solves:** Every render cycle generates a new function identity in memory. Because `<SearchFilter />` is memoized via `React.memo`, passing an inline or unmemoized callback would cause `<SearchFilter />` to re-render whenever a heart icon is toggled anywhere in the grid.
- **What would break:** Toggling favorites on photos would force redundant reconciliation passes on the search bar.

#### `useMemo` on Filtered Photos:
```typescript
const filteredPhotos = useMemo(() => {
  const query = searchQuery.trim().toLowerCase()
  return photos.filter((photo) => {
    const matchesAuthor = query === '' || photo.author.toLowerCase().includes(query)
    const matchesView = filterView === 'favourites' ? favouritesState.favourites.includes(photo.id) : true
    return matchesAuthor && matchesView
  })
}, [photos, searchQuery, filterView, favouritesState.favourites])
```
- **Problem it solves:** Filtering 30 photos with string conversions and array operations takes CPU cycles. `useMemo` caches the filtered array and only recomputes when `photos`, `searchQuery`, `filterView`, or `favourites` change.
- **What would break:** Unrelated re-renders (such as theme switching or modal inspection) would re-execute the filtering algorithm on every frame.

---

### 5. Technical Challenge & Solution
- **The Problem (Cumulative Layout Shift & Raw Image Weight):**  
  The Picsum REST API provides photos with varying native dimensions (e.g. 5000×3333, 4000×3000). Fetching and displaying the full 5000px assets causes hundreds of megabytes of bandwidth overhead, slow loading on mobile devices, and jarring layout shifts (CLS) as images decode asynchronously.
- **The Solution:**  
  1. Designed a fixed `aspect-[4/3]` container with `overflow-hidden` and `object-cover` on every card.
  2. Utilized an optimized thumbnail endpoint (`https://picsum.photos/id/:id/600/400`) for the responsive grid, reserving the 5000px asset only for the on-demand Lightbox preview modal.
  3. Paired each card with an inline shimmering placeholder that smoothly transitions to full opacity via `onLoad` callbacks.

---

## 🛠️ Local Development & QA Verification

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Production build
npm run build

# 4. Start production preview on port 3999
npm run start

# 5. Run headless Playwright automated QA verification
python3 scripts/verify_qa.py
```

---

## 🛡️ License

Built for **Celebrare** by **Yash Jain**. Private technical submission.
