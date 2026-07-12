"use client"

import { useRef } from "react"
import { Mail, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { usePresence } from "@/hooks/use-presence"
import { cn } from "@/lib/utils"

interface StockSelectionToolbarProps {
  count: number
  onClear: () => void
  onOrder: () => void
}

export function StockSelectionToolbar({ count, onClear, onOrder }: StockSelectionToolbarProps) {
  const { mounted, visible, duration, handleTransitionEnd } = usePresence(count > 0)
  const lastCountRef = useRef(0)

  if (count > 0) {
    lastCountRef.current = count
  }

  const displayCount = count > 0 ? count : lastCountRef.current

  if (!mounted) return null

  return (
    <div
      role="toolbar"
      aria-label="Acciones de selección"
      aria-hidden={!visible}
      onTransitionEnd={handleTransitionEnd}
      style={{ transitionDuration: `${duration}ms` }}
      className={cn(
        "fixed bottom-6 left-1/2 z-40 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2",
        "transition-[opacity,transform] ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <div className="flex items-center justify-between gap-3 rounded-4xl border bg-popover/95 px-4 py-3 shadow-lg ring-1 ring-foreground/10 backdrop-blur-sm supports-backdrop-filter:bg-popover/80">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClear}
            disabled={!visible}
            aria-label="Cancelar selección"
          >
            <X />
          </Button>
          <p className="truncate text-sm font-medium">
            {displayCount} {displayCount === 1 ? "producto seleccionado" : "productos seleccionados"}
          </p>
        </div>
        <Button
          onClick={onOrder}
          disabled={!visible}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Mail data-icon="inline-start" />
          Pedir Seleccionados
        </Button>
      </div>
    </div>
  )
}
