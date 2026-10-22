import React, { useState } from 'react'
import { Heart, User, Maximize2, ExternalLink } from 'lucide-react'
import type { Photo } from '../types'

interface PhotoCardProps {
  photo: Photo
  isFavourite: boolean
  onToggleFavourite: (id: string) => void
  onSelectPhoto: (photo: Photo) => void
}

export const PhotoCard: React.FC<PhotoCardProps> = React.memo(({
  photo,
  isFavourite,
  onToggleFavourite,
  onSelectPhoto,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Use optimized 600x400 thumbnail for responsive performance, fallback to download_url
  const thumbnailUrl = imageError
    ? photo.download_url
    : `https://picsum.photos/id/${photo.id}/600/400`

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavourite(photo.id)
  }

  return (
    <div
      data-testid={`photo-card-${photo.id}`}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl dark:hover:shadow-rose-950/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => onSelectPhoto(photo)}
    >
      {/* Photo Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        
        {/* Shimmer Placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700/60 dark:to-slate-800 animate-pulse" />
        )}

        <img
          src={thumbnailUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Gradient Overlay for Top Controls */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Favourites Heart Button */}
        <button
          type="button"
          data-testid={`favourite-btn-${photo.id}`}
          onClick={handleHeartClick}
          aria-label={isFavourite ? `Remove ${photo.author}'s photo from favourites` : `Add ${photo.author}'s photo to favourites`}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md ${
            isFavourite
              ? 'bg-rose-500/95 text-white scale-105 ring-2 ring-white/80 dark:ring-rose-400'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:scale-110'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFavourite ? 'fill-white stroke-white animate-pulse-once' : 'stroke-current'
            }`}
          />
        </button>

        {/* Quick View expand badge on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 backdrop-blur-sm text-white p-1.5 rounded-lg">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Card Details: Author & Meta */}
      <div className="p-4 sm:p-4.5 flex items-center justify-between gap-3 bg-white dark:bg-slate-900 transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-400">
            <User className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-none mb-1">
              Photographer
            </p>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-rose-500 transition-colors">
              {photo.author}
            </h3>
          </div>
        </div>

        {/* ID pill / Unsplash badge */}
        <a
          href={photo.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="View original on Unsplash"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
})

PhotoCard.displayName = 'PhotoCard'
