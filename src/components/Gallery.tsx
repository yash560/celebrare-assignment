import React, { useState, useReducer, useCallback, useMemo } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import { favouritesReducer, initFavouritesState } from '../reducers/favouritesReducer'
import { PhotoCard } from './PhotoCard'
import { SearchFilter } from './SearchFilter'
import { LoadingSkeleton } from './LoadingSkeleton'
import { ErrorMessage } from './ErrorMessage'
import { PhotoModal } from './PhotoModal'
import { ImageOff, Heart } from 'lucide-react'
import type { Photo, FilterView } from '../types'

interface GalleryProps {
  filterView: FilterView
  onFilterChange: (view: FilterView) => void
  onUpdateStats: (total: number, favourites: number) => void
}

/**
 * Gallery Component
 * 
 * Satisfies all Celebrare technical requirements:
 * 1. Uses custom hook `useFetchPhotos` — does NOT fetch data directly.
 * 2. Uses `useReducer` to manage favourites list with localStorage persistence.
 * 3. Uses `useCallback` on the search filter handler.
 * 4. Uses `useMemo` to compute the real-time filtered photo list.
 * 5. Displays in a responsive grid: 4 cols on desktop, 2 cols on tablet, 1 col on mobile.
 */
export const Gallery: React.FC<GalleryProps> = ({
  filterView,
  onFilterChange,
  onUpdateStats,
}) => {
  // Requirement 6: Use custom hook useFetchPhotos
  const { photos, loading, error, refetch } = useFetchPhotos()

  // Requirement 5: Manage favourites list using useReducer — not useState
  const [favouritesState, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    initFavouritesState
  )

  // Search filter query state
  const [searchQuery, setSearchQuery] = useState('')

  // Selected photo for enlarged preview modal
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  // Notify parent of total counts for navbar badges
  React.useEffect(() => {
    onUpdateStats(photos.length, favouritesState.favourites.length)
  }, [photos.length, favouritesState.favourites.length, onUpdateStats])

  /**
   * Requirement 7a: useCallback on the search filter handler.
   * Preserves referential equality across render cycles so that the memoized
   * SearchFilter child component does not needlessly re-render on heart clicks.
   */
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  /**
   * Action dispatcher for toggling favourite
   */
  const handleToggleFavourite = useCallback((photoId: string) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId })
  }, [])

  /**
   * Requirement 7b: useMemo to compute the filtered photo list.
   * Prevents recalculating the filter over all 30 photos on every unrelated
   * render cycle (such as theme toggles or modal interactions).
   */
  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return photos.filter((photo) => {
      // Filter by author name in real-time
      const matchesAuthor =
        query === '' || photo.author.toLowerCase().includes(query)

      // Filter by Favourites view if active
      const matchesView =
        filterView === 'favourites'
          ? favouritesState.favourites.includes(photo.id)
          : true

      return matchesAuthor && matchesView
    })
  }, [photos, searchQuery, filterView, favouritesState.favourites])

  // Look up if selected modal photo is favorited
  const isSelectedPhotoFavourite = useMemo(() => {
    return selectedPhoto ? favouritesState.favourites.includes(selectedPhoto.id) : false
  }, [selectedPhoto, favouritesState.favourites])

  return (
    <div className="w-full">
      {/* Search Filter Header */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        totalCount={photos.length}
        filteredCount={filteredPhotos.length}
      />

      {/* Loading State: Shimmer Skeleton */}
      {loading && <LoadingSkeleton />}

      {/* Error State: Alert banner with retry */}
      {error && !loading && (
        <ErrorMessage message={error} onRetry={refetch} />
      )}

      {/* Loaded Content */}
      {!loading && !error && (
        <>
          {filteredPhotos.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 sm:py-24 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm max-w-xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                {filterView === 'favourites' ? (
                  <Heart className="w-8 h-8 text-rose-400" />
                ) : (
                  <ImageOff className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {filterView === 'favourites' && favouritesState.favourites.length === 0
                  ? 'No favourites added yet'
                  : 'No matching photos found'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                {filterView === 'favourites' && favouritesState.favourites.length === 0
                  ? 'Click the heart icon on any photo in the gallery to save it to your favourites.'
                  : `We couldn't find any photos by authors matching "${searchQuery}". Try a different keyword.`}
              </p>
              <div className="flex items-center justify-center gap-3">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}
                {filterView === 'favourites' && (
                  <button
                    type="button"
                    onClick={() => onFilterChange('all')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    View All Photos
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Requirement 3: Responsive Grid
               Desktop: 4 columns (lg:grid-cols-4)
               Tablet: 2 columns (sm:grid-cols-2)
               Mobile: 1 column (grid-cols-1)
            */
            <div
              id="gallery-grid"
              data-testid="gallery-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredPhotos.map((photo) => {
                const isFavourite = favouritesState.favourites.includes(photo.id)
                return (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourite={isFavourite}
                    onToggleFavourite={handleToggleFavourite}
                    onSelectPhoto={setSelectedPhoto}
                  />
                )
              })}
            </div>
          )}
        </>
      )}

      {/* Lightbox Preview Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isFavourite={isSelectedPhotoFavourite}
        onToggleFavourite={handleToggleFavourite}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  )
}
