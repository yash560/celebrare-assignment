export interface Photo {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export interface FavouritesState {
  favourites: string[] // Array of favorited photo IDs
}

export type FavouritesAction =
  | { type: 'TOGGLE_FAVOURITE'; payload: string }
  | { type: 'REMOVE_FAVOURITE'; payload: string }
  | { type: 'CLEAR_FAVOURITES' }
  | { type: 'SET_FAVOURITES'; payload: string[] }

export type FilterView = 'all' | 'favourites'
