# 🎙️ Celebrare Technical Walkthrough & Video Recording Transcript

> **Candidate:** Yash Jain  
> **Role:** Frontend React Internship (Web Developer)  
> **Assignment:** Photo Gallery Web App with Picsum API, useReducer & Custom Hooks  
> **Target Video Duration:** ~5 Minutes  
> **Live Demo:** [https://celebrare-rho.vercel.app](https://celebrare-rho.vercel.app)  
> **GitHub:** [https://github.com/yash560/celebrare-assignment](https://github.com/yash560/celebrare-assignment)

---

## ⏱️ Video Presentation Timeline & Timestamps

| Timestamp | Section | Visual Element / Code Focus |
|---|---|---|
| `00:00 - 00:37` | **1. Introduction** | Hero header, title, tech stack badge (React 19 + Vite + Tailwind CSS v4). |
| `00:37 - 01:52` | **2. Live Application Demo** | Shimmer loading skeleton, 4-col responsive grid, author search filtering in real time, favourite heart toggle, favourites-only filter, page reload showing `localStorage` persistence, light/dark mode contrast, photo lightbox modal. |
| `01:52 - 02:41` | **3. Custom Hook (`useFetchPhotos`)** | Code inspection of `src/hooks/useFetchPhotos.ts`. Explanation of return interface (`photos, loading, error, refetch`), error handling, and `AbortController` unmount cleanup. |
| `02:41 - 03:30` | **4. State Management (`useReducer`)** | Code inspection of `src/reducers/favouritesReducer.ts`. Explanation of action types (`TOGGLE_FAVOURITE`, `CLEAR_FAVOURITES`), why `useReducer` was chosen over `useState`, and synchronous `localStorage` updates. |
| `03:30 - 04:26` | **5. Performance Hooks (`useCallback` & `useMemo`)** | Code inspection of `src/components/Gallery.tsx`. Explanation of `useCallback` on `handleSearchChange` and `useMemo` on `filteredPhotos`. Discussion of referential equality and regression impact if removed. |
| `04:26 - 05:22` | **6. Hardest Technical Challenge** | Discussion of Cumulative Layout Shift (CLS) prevention, aspect ratio stability, and thumbnail derivation vs raw 5000px assets. Conclusion and closing. |

---

## 📜 Full Script & Spoken Narration

### Section 1: Introduction (00:00 - 00:37)
*"Hello Celebrare team! My name is Yash Jain, and this is my video presentation and technical walkthrough for the Frontend React Internship assignment. In this video, I will demonstrate the live photo gallery web application, walk through the custom useFetchPhotos hook, explain our useReducer architecture with localStorage persistence, detail our performance optimizations with useCallback and useMemo, and discuss the primary technical challenge faced during implementation."*

---

### Section 2: Live Application Demo (00:37 - 01:52)
*"First, let us look at the live application. The app connects to the Picsum Photos API to fetch 30 curated photos. While data is in flight, a responsive shimmer skeleton indicates loading state across all screen sizes. On desktop, photos display in a balanced four-column grid. On tablet, it shifts to two columns, and on mobile, one column.*

*At the top, we have a real-time search filter. As I type an author name, such as Alejandro, the gallery filters instantly without page reload or additional API requests.*

*Next, each photo card features a heart button. Clicking it marks the photo as a favourite. We can toggle over to the Favourites view to see only our starred photos. Notice that when I refresh the browser, all favourited photos remain intact, loaded seamlessly from localStorage. The interface also provides full dark mode and light mode toggling with sharp contrast and accessibility."*

---

### Section 3: Custom Hook — `useFetchPhotos` (01:52 - 02:41)
*"Now let us examine the custom hook, useFetchPhotos. Following clean architecture principles, all API fetching logic is extracted out of the UI components. The hook returns four properties: photos, loading, error, and a refetch function.*

*If the Picsum API fails or the network disconnects, the hook catches the error, sets loading to false, and exposes a descriptive error string. The gallery displays a user-friendly error banner with a Try Again button. Furthermore, we utilize an AbortController inside useEffect to cancel pending network requests on unmount, preventing memory leaks."*

---

### Section 4: State Management — `useReducer` vs `useState` (02:41 - 03:30)
*"Next, let us discuss state management. Celebrare specifically requires useReducer for favourites. Our reducer handles explicit action types: TOGGLE_FAVOURITE, REMOVE_FAVOURITE, CLEAR_FAVOURITES, and SET_FAVOURITES.*

*Why useReducer instead of useState? First, it isolates business logic from event handlers into a single, predictable pure function. Second, it guarantees atomic state transitions paired with synchronous localStorage persistence. And third, it enables lazy initialization, reading localStorage only once on initial mount."*

---

### Section 5: Performance Optimization — `useCallback` & `useMemo` (03:30 - 04:26)
*"Moving to performance optimization, we use useCallback and useMemo in the Gallery component. We apply useCallback to the search change handler. In React, inline functions receive a new memory reference on every render. Because our SearchFilter is wrapped in React.memo, omitting useCallback would cause the search bar to re-render every time any heart icon is clicked.*

*Meanwhile, we apply useMemo to compute the filtered photo list. Filtering 30 photos with string lowercasing and array scanning is computation that should only execute when photos, searchQuery, filterView, or favourites change. Without useMemo, every unrelated interaction like toggling themes or opening modals would re-run the filtering loop."*

---

### Section 6: Technical Challenge & Solution (04:26 - 05:22)
*"Finally, the most challenging technical aspect was managing Cumulative Layout Shift and varying image aspect ratios. The Picsum API provides full-resolution photos up to 5000 pixels wide with varied aspect ratios. Downloading these massive assets directly caused slow load times and jarring jumps as images decoded.*

*I solved this by enforcing a strict aspect-4-to-3 container with object-cover on every card, deriving an optimized 600-by-400 thumbnail endpoint for grid cards, and pairing each card with an inline skeleton that fades smoothly upon image load, reserving the full-resolution asset strictly for the lightbox modal. Thank you for reviewing my assignment. I look forward to contributing to Celebrare!"*
