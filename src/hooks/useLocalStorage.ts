import {useState, useEffect} from 'react'

/**
 * Custom hook for managing localStorage with React state synchronization
 * @param key - The localStorage key
 * @param initialValue - The initial value if no value exists in localStorage
 * @returns [value, setValue, removeValue] - The current value, setter function, and remove function
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch {
      // If error also return initialValue
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch {
      // A more advanced implementation would handle the error case
    }
  }

  // Function to remove the value from localStorage
  const removeValue = () => {
    try {
      // Remove from local storage
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
      // Reset state to initial value
      setStoredValue(initialValue)
    } catch {
      // Ignore localStorage errors in removeValue
    }
  }

  return [storedValue, setValue, removeValue] as const
}
