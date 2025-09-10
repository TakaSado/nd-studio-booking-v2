import React from 'react'

type Step = {
  label: string
}

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <ol className="flex items-center w-full">
      {steps.map((s, i) => {
        const active = i <= current
        return (
          <li key={i} className="flex-1 flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${active ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-400'}`}>{i + 1}</div>
            <div className={`ml-2 text-sm ${active ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</div>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-200 mx-3" />}
          </li>
        )
      })}
    </ol>
  )
}

