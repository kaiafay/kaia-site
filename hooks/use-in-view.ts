"use client"

import { useState, useEffect, type RefObject } from "react"

export function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isInView
}
