import React, { useEffect } from 'react'
import { X, Heart, ExternalLink, Download, User, Sparkles } from 'lucide-react'
import type { Photo } from '../types'

interface PhotoModalProps {
  photo: Photo | null
  isFavourite: boolean
  onToggleFavourite: (id: string) => void
  onClose: () => void
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photo,
  isFavourite,
  onToggleFavourite,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (photo) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [photo, onClose])

  if (!photo) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {photo.author}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Resolution: {photo.width} × {photo.height}px
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Favourite toggle in modal */}
            <button
              type="button"
              id="modal-toggle-favourite-btn"
              onClick={() => onToggleFavourite(photo.id)}
              className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isFavourite
                  ? 'bg-rose-500 border-rose-500 text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title={isFavourite ? 'Favorited' : 'Add to favourites'}
            >
              <Heart className={`w-4 h-4 ${isFavourite ? 'fill-white' : ''}`} />
            </button>

            {/* Direct download / original */}
            <a
              href={photo.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Open full resolution"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Close button */}
            <button
              type="button"
              id="modal-close-btn"
              onClick={onClose}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Image Body */}
        <div className="relative flex-1 overflow-auto bg-slate-950 flex items-center justify-center p-2 sm:p-4 min-h-[300px]">
          <img
            src={photo.download_url}
            alt={`Enlarged view by ${photo.author}`}
            className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-lg select-none"
          />
        </div>

        {/* Modal Footer info */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Picsum ID #{photo.id}</span>
          </div>
          <a
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-rose-500 hover:underline font-medium"
          >
            <span>View photographer portfolio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
