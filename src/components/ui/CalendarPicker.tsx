import React from 'react'
import { DateTime } from 'luxon'

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
    <div className="flex items-center gap-3">
      <input
        type="date"
        className="border rounded-2xl px-3 py-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select className="border rounded-2xl px-3 py-2" value={hour} onChange={(e) => setHour(Number(e.target.value))}>
        {hours.map((h) => (
          <option key={h} value={h}>{h.toString().padStart(2, '0')}:00</option>
        ))}
      </select>
      <button className="px-4 py-2 rounded-2xl bg-black text-white" onClick={apply}>1時間で選択</button>
      {value && (
        <div className="text-sm text-gray-600">
          選択中: {DateTime.fromISO(value.startISO).toFormat('yyyy/LL/dd HH:mm')} - {DateTime.fromISO(value.endISO).toFormat('HH:mm')}
        </div>
      )}
    </div>
  )
}

