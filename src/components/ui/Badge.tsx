import React from 'react'

export function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2.5 py-1 text-xs font-medium ${className}`}>{children}</span>
}

