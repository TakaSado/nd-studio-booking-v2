import React from 'react'
import { DateTime } from 'luxon'
import { Button } from './Button'

type Props = {
  value: { startISO: string; endISO: string } | null
  onChange: (v: { startISO: string; endISO: string }) => void
}

// 簡易: 1時間スロットを日/週切替なしで選択（MVP）。
export function CalendarPicker({ value, onChange }: Props) {
  const [date, setDate] = React.useState<string>(DateTime.local().toISODate()!)
  const [hour, setHour] = React.useState<number>(DateTime.local().hour + 1)

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const apply = () => {
    const start = DateTime.fromISO(`${date}T${String(hour).padStart(2, '0')}:00:00`)
    const end = start.plus({ hours: 1 })
    onChange({ startISO: start.toISO()!, endISO: end.toISO()! })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700">日付:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-xl px-4 py-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-700">時間:</label>
          <select 
            className="border border-gray-300 rounded-xl px-4 py-2.5 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
            value={hour} 
            onChange={(e) => setHour(Number(e.target.value))}
          >
            {hours.map((h) => (
              <option key={h} value={h}>{h.toString().padStart(2, '0')}:00</option>
            ))}
          </select>
        </div>
        <Button variant="secondary" onClick={apply}>
          1時間で選択
        </Button>
      </div>
      {value && (
        <div className="text-sm font-semibold text-gray-700 bg-primary-50 rounded-lg px-4 py-2 inline-block">
          📅 選択中: {DateTime.fromISO(value.startISO).toFormat('yyyy年MM月dd日 HH:mm')} - {DateTime.fromISO(value.endISO).toFormat('HH:mm')}
        </div>
      )}
    </div>
  )
}

