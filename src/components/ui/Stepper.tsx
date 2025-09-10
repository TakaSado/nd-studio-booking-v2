import React from 'react'

type Step = {
  label: string
  icon?: string
}

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <div className="max-w-4xl mx-auto px-8">
      <ol className="flex items-center w-full">
        {steps.map((s, i) => {
          const active = i <= current
          const isCompleted = i < current
          const isLast = i === steps.length - 1
          
          return (
            <li key={i} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all ${
                  active 
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md' 
                    : 'border-gray-300 text-gray-400 bg-white'
                }`}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-lg">{s.icon || i + 1}</span>
                  )}
                </div>
                <div className={`ml-3 font-medium whitespace-nowrap ${
                  active ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  <span className="text-sm tracking-wide">{s.label}</span>
                </div>
              </div>
              {!isLast && (
                <div className={`flex-1 h-[1px] mx-6 transition-colors ${
                  isCompleted ? 'bg-primary-500' : 'bg-gray-200'
                }`} />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

