import { useCallback, useEffect, useState } from "react"

const DEFAULT_DURATION = 300

/**
 * Mantiene un elemento montado durante la animación de salida.
 * Usa transiciones CSS (opacity + transform) en lugar de alternar
 * clases animate-in/animate-out, que provocan saltos visuales.
 */
export function usePresence(active: boolean, duration = DEFAULT_DURATION) {
  const [mounted, setMounted] = useState(active)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (active) {
      setMounted(true)

      let outerFrame = 0
      let innerFrame = 0

      outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => setVisible(true))
      })

      return () => {
        cancelAnimationFrame(outerFrame)
        cancelAnimationFrame(innerFrame)
      }
    }

    setVisible(false)
  }, [active])

  const handleTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLElement>) => {
      if (event.target !== event.currentTarget) return
      if (event.propertyName !== "opacity") return
      if (!active) setMounted(false)
    },
    [active]
  )

  return { mounted, visible, duration, handleTransitionEnd }
}
