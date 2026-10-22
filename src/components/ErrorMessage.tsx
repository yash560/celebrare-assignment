import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-lg mx-auto my-12 p-6 sm:p-8 bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 rounded-3xl text-center shadow-lg shadow-rose-500/5">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        Unable to Load Photos
      </h3>
      
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
        {message || 'The Picsum Photos service could not be reached. Please verify your internet connection and try again.'}
      </p>

      <button
        type="button"
        id="retry-fetch-btn"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md shadow-rose-600/20 transition-all duration-200 cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  )
}
