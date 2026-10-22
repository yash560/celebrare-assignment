import React, { useState, useEffect, useCallback } from 'react'
import { Navbar } from './components/Navbar'
import { Gallery } from './components/Gallery'
import { ArchitectureGuideModal } from './components/ArchitectureGuideModal'
import { Camera, Sparkles, Heart, Code2 } from 'lucide-react'
import type { FilterView } from './types'

export const App: React.FC = () => {
  // Theme state: dark mode toggle with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('celebrare_theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  // Synchronize 'dark' class on <html> element
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('celebrare_theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('celebrare_theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev)
  }, [])

  // Filter view state: 'all' vs 'favourites'
  const [filterView, setFilterView] = useState<FilterView>('all')

  // Total counts for navbar badges
  const [stats, setStats] = useState({ total: 30, favourites: 0 })

  const handleUpdateStats = useCallback((total: number, favourites: number) => {
    setStats({ total, favourites })
  }, [])

  // Architecture explainer modal state
  const [isExplainerOpen, setIsExplainerOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sticky Navigation */}
      <Navbar
        filterView={filterView}
        onFilterChange={setFilterView}
        favouritesCount={stats.favourites}
        totalPhotosCount={stats.total}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenExplainer={() => setIsExplainerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-semibold mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>High-Fidelity Photo Exhibition</span>
            <span className="inline-block w-1 h-1 rounded-full bg-rose-400" />
            <span>Picsum REST API</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Discover Extraordinary Visual Moments
          </h1>

          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A responsive, real-time photo gallery engineered with React 19, custom hooks, and <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-rose-500 font-semibold">useReducer</code> state persistence.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>30 Curated Photos</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>{stats.favourites} Saved Favourites</span>
            </div>
            <button
              type="button"
              onClick={() => setIsExplainerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 shadow-xs hover:bg-rose-500/20 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>View Architecture Specs</span>
            </button>
          </div>
        </div>

        {/* Core Gallery Component */}
        <Gallery
          filterView={filterView}
          onFilterChange={setFilterView}
          onUpdateStats={handleUpdateStats}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Celebrare Frontend Internship Assignment
            </span>
            <span>•</span>
            <span>Candidate: Yash Jain</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              React 19 + Vite + TypeScript + Tailwind CSS v4
            </span>
          </div>
        </div>
      </footer>

      {/* Technical Explainer Modal */}
      <ArchitectureGuideModal
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />
    </div>
  )
}

export default App
