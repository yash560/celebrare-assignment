import React from 'react'
import { Heart, Moon, Sun, BookOpen, Sparkles } from 'lucide-react'
import type { FilterView } from '../types'

interface NavbarProps {
  filterView: FilterView
  onFilterChange: (view: FilterView) => void
  favouritesCount: number
  totalPhotosCount: number
  darkMode: boolean
  onToggleDarkMode: () => void
  onOpenExplainer: () => void
}

export const Navbar: React.FC<NavbarProps> = React.memo(({
  filterView,
  onFilterChange,
  favouritesCount,
  totalPhotosCount,
  darkMode,
  onToggleDarkMode,
  onOpenExplainer,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Celebrare
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 uppercase tracking-wider">
                  Gallery
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Curated Visual Exhibition • Frontend Assessment
              </p>
            </div>
          </div>

          {/* Center / Navigation Filters */}
          <nav className="flex items-center gap-1 sm:gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <button
              type="button"
              id="filter-all-btn"
              onClick={() => onFilterChange('all')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                filterView === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>All Photos</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                filterView === 'all'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  : 'bg-slate-200/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400'
              }`}>
                {totalPhotosCount}
              </span>
            </button>

            <button
              type="button"
              id="filter-favourites-btn"
              onClick={() => onFilterChange('favourites')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                filterView === 'favourites'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-500/20 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${filterView === 'favourites' ? 'fill-white text-white' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>Favourites</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                filterView === 'favourites'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
              }`}>
                {favouritesCount}
              </span>
            </button>
          </nav>

          {/* Right Controls: Technical Explainer & Dark Mode */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="explainer-btn"
              onClick={onOpenExplainer}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              title="View Technical Walkthrough & Code Architecture Guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-500" />
              <span>Interview Guide</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={onToggleDarkMode}
              aria-label="Toggle light/dark theme"
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer shadow-xs"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-spin-once" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 hover:text-slate-900" />
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  )
})

Navbar.displayName = 'Navbar'
