import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed'
  const styles: Record<typeof variant, string> = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-accent text-gray-900 hover:opacity-90',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 border border-gray-200'
  } as const

  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />
}

