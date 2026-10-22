import React from 'react'

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
      </div>

      {/* Responsive Grid: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm animate-pulse"
          >
            {/* Shimmer Image */}
            <div className="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800" />

            {/* Shimmer Metadata */}
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="space-y-1.5 w-3/4">
                  <div className="h-2.5 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-3.5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              </div>
              <div className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
