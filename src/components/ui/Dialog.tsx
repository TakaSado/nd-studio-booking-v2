import React from 'react'

type DialogProps = {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export function Dialog({ open, onClose, title, children }: DialogProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-soft">
        {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
        {children}
      </div>
    </div>
  )
}

