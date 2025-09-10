import React from 'react'

type Props = {
  title?: string
  children?: React.ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
}

const styles: Record<NonNullable<Props['variant']>, string> = {
  info: 'bg-blue-50 text-blue-900 border-blue-200',
  success: 'bg-green-50 text-green-900 border-green-200',
  warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
  error: 'bg-red-50 text-red-900 border-red-200'
}

export function Alert({ title, children, variant = 'info' }: Props) {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${styles[variant]}`}>
      {title && <div className="font-semibold mb-1">{title}</div>}
      {children}
    </div>
  )
}

