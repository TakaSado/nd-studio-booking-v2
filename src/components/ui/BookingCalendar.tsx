'use client'

import React from 'react'
import { DateTime } from 'luxon'
import { cn } from '@/lib/utils'
import { Button } from './Button'

interface BookingCalendarProps {
  value: { date: string; startTime: string; endTime: string } | null
  onChange: (value: { date: string; startTime: string; endTime: string }) => void
  // 後でGoogleカレンダーから取得する予約データ
  bookedSlots?: Array<{ date: string; startTime: string; endTime: string }>
}

export function BookingCalendar({ value, onChange, bookedSlots = [] }: BookingCalendarProps) {
  const [selectedMonth, setSelectedMonth] = React.useState(DateTime.local())
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null)
  const [selectedStartTime, setSelectedStartTime] = React.useState<string | null>(null)
  const [selectedEndTime, setSelectedEndTime] = React.useState<string | null>(null)

  // デモ用の予約済みスロット（後でGoogleカレンダーAPIから取得）
  const demoBookedSlots = [
    { date: '2025-01-15', startTime: '10:00', endTime: '12:00' },
    { date: '2025-01-15', startTime: '14:00', endTime: '16:00' },
    { date: '2025-01-16', startTime: '11:00', endTime: '13:00' },
    { date: '2025-01-16', startTime: '15:00', endTime: '18:00' },
    { date: '2025-01-17', startTime: '13:00', endTime: '15:00' },
    { date: '2025-01-18', startTime: '10:00', endTime: '14:00' },
  ]

  const allBookedSlots = [...bookedSlots, ...demoBookedSlots]

  // カレンダーの日付を生成
  const generateCalendarDays = () => {
    const startOfMonth = selectedMonth.startOf('month')
    const endOfMonth = selectedMonth.endOf('month')
    const startDate = startOfMonth.startOf('week')
    const endDate = endOfMonth.endOf('week')
    
    const days = []
    let currentDate = startDate
    
    while (currentDate <= endDate) {
      days.push(currentDate)
      currentDate = currentDate.plus({ days: 1 })
    }
    
    return days
  }

  // 24時間の時間スロットを生成
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    return `${i.toString().padStart(2, '0')}:00`
  })

  // 特定の日付・時間が予約済みかチェック
  const isTimeBooked = (date: string, time: string) => {
    const timeHour = parseInt(time.split(':')[0])
    return allBookedSlots.some(slot => {
      if (slot.date !== date) return false
      const startHour = parseInt(slot.startTime.split(':')[0])
      const endHour = parseInt(slot.endTime.split(':')[0])
      return timeHour >= startHour && timeHour < endHour
    })
  }

  // 日付が選択可能かチェック
  const isDateSelectable = (date: DateTime) => {
    const today = DateTime.local().startOf('day')
    return date >= today
  }

  // 日付に予約があるかチェック
  const hasBookingsOnDate = (date: string) => {
    return allBookedSlots.some(slot => slot.date === date)
  }

  const handleDateSelect = (date: DateTime) => {
    if (!isDateSelectable(date)) return
    const dateStr = date.toISODate()!
    setSelectedDate(dateStr)
    setSelectedStartTime(null)
    setSelectedEndTime(null)
  }

  const handleStartTimeSelect = (time: string) => {
    if (!selectedDate) return
    if (isTimeBooked(selectedDate, time)) return
    
    setSelectedStartTime(time)
    // 終了時間を自動的に1時間後に設定
    const hour = parseInt(time.split(':')[0])
    const endHour = (hour + 1) % 24
    setSelectedEndTime(`${endHour.toString().padStart(2, '0')}:00`)
  }

  const handleEndTimeSelect = (time: string) => {
    if (!selectedDate || !selectedStartTime) return
    const startHour = parseInt(selectedStartTime.split(':')[0])
    const endHour = parseInt(time.split(':')[0])
    
    // 終了時間は開始時間より後でなければならない
    if (endHour <= startHour) return
    
    setSelectedEndTime(time)
  }

  // 選択が完了したら親コンポーネントに通知
  React.useEffect(() => {
    if (selectedDate && selectedStartTime && selectedEndTime) {
      onChange({ date: selectedDate, startTime: selectedStartTime, endTime: selectedEndTime })
    }
  }, [selectedDate, selectedStartTime, selectedEndTime, onChange])

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setSelectedMonth(prev => 
      direction === 'prev' 
        ? prev.minus({ months: 1 })
        : prev.plus({ months: 1 })
    )
  }

  const calendarDays = generateCalendarDays()
  const weekDays = ['日', '月', '火', '水', '木', '金', '土']

  return (
    <div className="space-y-6">
      {/* カレンダー */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* カレンダーヘッダー */}
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => handleMonthChange('prev')}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-900">
            {selectedMonth.toFormat('yyyy年MM月')}
          </h3>
          <button
            onClick={() => handleMonthChange('next')}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={cn(
                "py-3 text-center text-sm font-bold",
                index === 0 ? "text-red-600" : index === 6 ? "text-blue-600" : "text-gray-900"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* カレンダー本体 */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, index) => {
            const dateStr = date.toISODate()!
            const isCurrentMonth = date.month === selectedMonth.month
            const isToday = date.hasSame(DateTime.local(), 'day')
            const isSelected = selectedDate === dateStr
            const isSelectable = isDateSelectable(date)
            const hasBookings = hasBookingsOnDate(dateStr)
            
            return (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                disabled={!isSelectable}
                className={cn(
                  "relative aspect-square p-2 border-r border-b border-gray-200 transition-all",
                  "hover:bg-gray-50",
                  !isCurrentMonth && "text-gray-400 bg-gray-50/50",
                  !isSelectable && "cursor-not-allowed opacity-50",
                  isToday && "bg-primary-50",
                  isSelected && "bg-primary-100 ring-2 ring-primary-500 ring-inset",
                  index % 7 === 6 && "border-r-0"
                )}
              >
                <span className={cn(
                  "text-base font-bold",
                  isToday && "text-primary-700",
                  isSelected && "text-primary-900",
                  !isCurrentMonth && "text-gray-400",
                  isCurrentMonth && !isToday && !isSelected && "text-gray-900"
                )}>
                  {date.day}
                </span>
                
                {/* 予約インジケーター */}
                {hasBookings && isCurrentMonth && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* 凡例 */}
        <div className="px-4 py-3 bg-gray-50 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary-100 border-2 border-primary-500 rounded"></div>
            <span className="text-gray-800 font-semibold">選択中</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary-50 rounded"></div>
            <span className="text-gray-800 font-semibold">本日</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
            <span className="text-gray-800 font-semibold">予約あり</span>
          </div>
        </div>
      </div>

      {/* 時間選択 */}
      {selectedDate && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {DateTime.fromISO(selectedDate).toFormat('MM月dd日')}の開始時間を選択
            </h3>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {timeSlots.map((time) => {
                const isBooked = isTimeBooked(selectedDate, time)
                const isSelected = selectedStartTime === time
                
                return (
                  <button
                    key={time}
                    onClick={() => handleStartTimeSelect(time)}
                    disabled={isBooked}
                    className={cn(
                      "py-2 px-3 rounded-lg font-semibold transition-all text-sm",
                      "border-2",
                      isBooked && "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through",
                      !isBooked && !isSelected && "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary-300",
                      isSelected && "bg-primary-500 text-white border-primary-500"
                    )}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 終了時間選択 */}
          {selectedStartTime && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                終了時間を選択（開始: {selectedStartTime}）
              </h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {timeSlots.map((time) => {
                  const hour = parseInt(time.split(':')[0])
                  const startHour = parseInt(selectedStartTime.split(':')[0])
                  const isDisabled = hour <= startHour || isTimeBooked(selectedDate, time)
                  const isSelected = selectedEndTime === time
                  
                  return (
                    <button
                      key={time}
                      onClick={() => handleEndTimeSelect(time)}
                      disabled={isDisabled}
                      className={cn(
                        "py-2 px-3 rounded-lg font-semibold transition-all text-sm",
                        "border-2",
                        isDisabled && "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed",
                        !isDisabled && !isSelected && "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary-300",
                        isSelected && "bg-primary-500 text-white border-primary-500"
                      )}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* 選択状態の表示 */}
          {selectedStartTime && selectedEndTime && (
            <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-primary-900 font-bold text-base">
                📅 選択中: {DateTime.fromISO(selectedDate).toFormat('yyyy年MM月dd日')}
              </p>
              <p className="text-primary-800 font-semibold mt-1">
                ⏰ 時間: {selectedStartTime} 〜 {selectedEndTime}
              </p>
              <p className="text-primary-700 text-sm mt-2">
                利用時間: {parseInt(selectedEndTime.split(':')[0]) - parseInt(selectedStartTime.split(':')[0])}時間
              </p>
            </div>
          )}
        </div>
      )}

      {/* 使用方法の説明 */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Googleカレンダー連携について</p>
            <p>現在はデモデータを表示しています。実際の運用時にはGoogleカレンダーと連携して、リアルタイムの予約状況が反映されます。</p>
          </div>
        </div>
      </div>
    </div>
  )
}