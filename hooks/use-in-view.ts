"use client"

import { useState, useEffect, type RefObject } from "react"

type UseInViewOptions = {
  threshold?: IntersectionObserverInit["threshold"]
  rootMargin?: IntersectionObserverInit["rootMargin"]
}

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options: UseInViewOptions = {},
) {
  const [isInView, setIsInView] = useState(false)
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])

  return isInView
}
