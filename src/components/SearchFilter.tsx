import React from 'react'
import { Search, X } from 'lucide-react'

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearSearch: () => void
  totalCount: number
  filteredCount: number
}

/**
 * SearchFilter component wrapped in React.memo to ensure it only re-renders
 * when its props change. Paired with useCallback in App.tsx for optimal performance.
 */
export const SearchFilter: React.FC<SearchFilterProps> = React.memo(({
  searchQuery,
  onSearchChange,
  onClearSearch,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-12">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-rose-500 transition-colors">
          <Search className="w-5 h-5" />
        </div>

        <input
          id="author-search-input"
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Filter photos by author name (e.g. Alejandro, Paul, Dan)..."
          className="w-full pl-11 pr-24 py-3.5 sm:py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 shadow-sm transition-all duration-200"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {searchQuery && (
            <button
              type="button"
              id="clear-search-btn"
              onClick={onClearSearch}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 select-none">
            {filteredCount}/{totalCount}
          </span>
        </div>
      </div>

      {searchQuery && (
        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>
            Filtering by author: <strong className="text-rose-500 font-semibold">"{searchQuery}"</strong>
          </span>
          <span className="italic">
            {filteredCount === 0 ? 'No matching authors' : `${filteredCount} photo${filteredCount === 1 ? '' : 's'} found`}
          </span>
        </div>
      )}
    </div>
  )
})

SearchFilter.displayName = 'SearchFilter'
