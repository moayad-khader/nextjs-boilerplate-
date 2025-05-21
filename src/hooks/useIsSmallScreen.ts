import {useEffect, useState} from 'react'
import {BREAKPOINTS} from '@/constants/breakpoints'

export function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < BREAKPOINTS.md)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isSmall
}
