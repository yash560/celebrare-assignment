import type { FavouritesState, FavouritesAction } from '../types'

export const STORAGE_KEY = 'celebrare_favourites_v1'

/**
 * Lazy initializer for useReducer that loads persisted favourites from localStorage.
 * Guarantees zero SSR/hydration mismatch and graceful error fallback.
 */
export function initFavouritesState(): FavouritesState {
  if (typeof window === 'undefined') {
    return { favourites: [] }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { favourites: [] }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return { favourites: parsed.map(String) }
    }
  } catch (err) {
    console.error('Failed to parse favourites from localStorage:', err)
  }

  return { favourites: [] }
}

/**
 * Pure reducer function for favourites state management.
 * Explicitly replaces useState as required by Celebrare's technical guidelines.
 */
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

      // Persist synchronously to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavourites))
      } catch (err) {
        console.error('Failed to persist favourites to localStorage:', err)
      }

      return {
        ...state,
        favourites: nextFavourites,
      }
    }

    case 'REMOVE_FAVOURITE': {
      const nextFavourites = state.favourites.filter((id) => id !== action.payload)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavourites))
      } catch (err) {
        console.error('Failed to persist favourites to localStorage:', err)
      }
      return {
        ...state,
        favourites: nextFavourites,
      }
    }

    case 'CLEAR_FAVOURITES': {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch (err) {
        console.error('Failed to clear favourites from localStorage:', err)
      }
      return {
        ...state,
        favourites: [],
      }
    }

    case 'SET_FAVOURITES': {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload))
      } catch (err) {
        console.error('Failed to set favourites to localStorage:', err)
      }
      return {
        ...state,
        favourites: action.payload,
      }
    }

    default:
      return state
  }
}
