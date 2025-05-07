/**
 * Central configuration file for environment variables and defaults
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
