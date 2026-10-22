import { useState, useEffect, useCallback } from 'react'
import type { Photo } from '../types'

interface UseFetchPhotosReturn {
  photos: Photo[]
  loading: boolean
  error: string | null
  refetch: () => void
}

const API_URL = 'https://picsum.photos/v2/list?limit=30'

/**
 * Custom hook to fetch photos from Picsum API.
 * Requirements:
 * - Must return: photos, loading, error (and refetch for resilient retries)
 * - Encapsulates loading, error, and async network states
 * - Uses AbortController to cleanly cancel inflight requests on component unmount
 */
export function useFetchPhotos(): UseFetchPhotosReturn {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPhotos = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URL, { signal })
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText || 'Failed to load photos'}`)
      }
      const data: Photo[] = await response.json()
      setPhotos(data)
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Request was aborted due to component unmount or re-fetch; ignore
        return
      }
      const message = err instanceof Error ? err.message : 'An unexpected error occurred while fetching photos.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchPhotos(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchPhotos])

  const refetch = useCallback(() => {
    fetchPhotos()
  }, [fetchPhotos])

  return { photos, loading, error, refetch }
}
