import React, { useState } from 'react'
import { X, CheckCircle2, Code2, Database, Zap, HelpCircle, Layers, Sparkles } from 'lucide-react'

interface ArchitectureGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ArchitectureGuideModal: React.FC<ArchitectureGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'hook' | 'reducer' | 'perf' | 'challenges'>('overview')

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Celebrare Technical Assessment Guide
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Architectural Breakdown • 5-Minute Presentation Notes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          {[
            { id: 'overview', label: '1. App Overview', icon: Layers },
            { id: 'hook', label: '2. useFetchPhotos', icon: Code2 },
            { id: 'reducer', label: '3. useReducer vs State', icon: Database },
            { id: 'perf', label: '4. useCallback & useMemo', icon: Zap },
            { id: 'challenges', label: '5. Technical Challenge', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-700 dark:text-slate-300">
          
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Core Scope & Specifications Implemented
              </h3>
              <p className="leading-relaxed">
                This production gallery was built strictly from scratch according to Celebrare's technical guidelines using <strong>React 19 + Vite + TypeScript + Tailwind CSS v4</strong>. No third-party UI libraries (Bootstrap, MUI, AntD) are used.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block mb-1">
                    API Fetching
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Picsum v2 endpoint (30 items) with loading skeleton, error banner, and retry mechanism.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block mb-1">
                    Responsive Grid
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    4 columns on desktop (&ge;1024px), 2 columns on tablet (&ge;640px), 1 column on mobile (&lt;640px).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block mb-1">
                    Real-Time Search
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Client-side filtering by author with 0 API requests and instant feedback.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block mb-1">
                    Favourites Persistence
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    useReducer architecture with localStorage persistence across browser restarts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hook' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-rose-500" />
                Custom Hook: <code>useFetchPhotos</code>
              </h3>
              <p className="leading-relaxed">
                Separates data fetching, lifecycle management, and error handling entirely from the UI components.
              </p>
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-1">
                <div className="text-emerald-400">// Returns exact interface: photos, loading, error (+ refetch)</div>
                <div>{`const { photos, loading, error, refetch } = useFetchPhotos()`}</div>
              </div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>What it returns:</strong> <code>photos</code> (Photo[]), <code>loading</code> (boolean), <code>error</code> (string | null), and <code>refetch</code> (() =&gt; void).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Error handling:</strong> If the network drops or the API returns non-200, it sets a human-readable <code>error</code> string, sets <code>loading: false</code>, and allows the user to click "Try Again".</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Memory Leak Protection:</strong> Employs <code>AbortController</code> in the <code>useEffect</code> cleanup function to cancel in-flight requests if the component unmounts.</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'reducer' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-rose-500" />
                State Management: <code>useReducer</code> vs <code>useState</code>
              </h3>
              <p className="leading-relaxed">
                Celebrare requires managing favourites state using <code>useReducer</code>. Here is why this architectural choice is superior for complex state:
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">
                    1. Action-Based Predictability & Decoupling
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    With <code>useState</code>, toggle logic (checking existence, filtering, or appending) is scattered throughout button click handlers. With <code>useReducer</code>, all business logic is consolidated into a pure reducer function driven by explicit action types (<code>TOGGLE_FAVOURITE</code>, <code>CLEAR_FAVOURITES</code>).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">
                    2. Synchronous Persistence & State Invariants
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    The reducer ensures that every state mutation is accompanied by immediate persistence to <code>localStorage</code>, preventing race conditions or stale state reads across tabs.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">
                    3. Lazy Initialization
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    The 3rd argument to <code>useReducer(favouritesReducer, undefined, initFavouritesState)</code> only executes once upon component mount, reading <code>localStorage</code> safely without blocking subsequent renders.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'perf' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Performance Optimization: <code>useCallback</code> + <code>useMemo</code>
              </h3>
              <p className="leading-relaxed">
                Celebrare explicitly tests understanding of React's memoization primitives:
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">
                    <code>useCallback</code> on Search Filter Handler
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    <strong>Problem it solves:</strong> Functions defined inside components receive a brand new memory reference on every render. Because <code>SearchFilter</code> is wrapped in <code>React.memo</code>, passing an unstable function reference would break memoization and force the search bar to re-render whenever any heart icon is clicked.
                  </p>
                  <p className="text-rose-500 font-medium">
                    <strong>What would break:</strong> Removing <code>useCallback</code> causes unnecessary reconciliation passes on child inputs during heart clicks, dropping frame rates.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">
                    <code>useMemo</code> on Filtered Photos List
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    <strong>Problem it solves:</strong> Filtering 30 photos by author name involves string lowercasing and array scanning. <code>useMemo</code> guarantees this calculation runs <em>only</em> when <code>photos</code>, <code>searchQuery</code>, <code>filterView</code>, or <code>favourites</code> change.
                  </p>
                  <p className="text-rose-500 font-medium">
                    <strong>What would break:</strong> Unrelated state changes (like opening this guide modal or toggling dark mode) would needlessly re-execute the filtering loop.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-rose-500" />
                Hardest Part of the Assignment & How It Was Solved
              </h3>
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs space-y-3">
                <p className="font-bold text-amber-900 dark:text-amber-200">
                  Cumulative Layout Shift (CLS) & Image Aspect Ratio Stability
                </p>
                <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                  "The most challenging aspect was preventing layout shifts while fetching photos from Picsum. The raw images returned by Picsum have varying resolutions (e.g. 5000x3333, 4000x3000) that take hundreds of milliseconds to download at full resolution. If rendered naively, images cause jarring jumps and slow page performance."
                </p>
                <p className="font-bold text-amber-900 dark:text-amber-200">
                  How it was solved:
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-amber-800/90 dark:text-amber-300/90">
                  <li>Enforced a strict <code>aspect-[4/3]</code> container on every card with <code>overflow-hidden</code> and <code>object-cover</code>.</li>
                  <li>Derived an optimized thumbnail CDN URL (<code>https://picsum.photos/id/:id/600/400</code>) for fast initial rendering, reserving the 5000px <code>download_url</code> for modal inspection.</li>
                  <li>Paired each card with an inline animated shimmering skeleton that fades out gracefully once <code>onLoad</code> signals image decoding completion.</li>
                </ol>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Candidate: Yash Jain • Full Stack Development Intern
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  )
}
