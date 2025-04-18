import { useState, useEffect } from "react"

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)
      
      setMatches(media.matches)
      
      const listener = (event) => {
        setMatches(event.matches)
      }
      
      if (media.addEventListener) {
        media.addEventListener("change", listener)
      } else {
        media.addListener(listener)
      }
      
      return () => {
        if (media.removeEventListener) {
          media.removeEventListener("change", listener)
        } else {
          media.removeListener(listener)
        }
      }
    }
    
    return undefined
  }, [query])
  
  return matches
} 