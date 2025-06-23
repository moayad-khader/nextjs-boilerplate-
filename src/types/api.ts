export type APICallbacks<T> = {
  onStart?: () => void
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  onFinish?: () => void
}
