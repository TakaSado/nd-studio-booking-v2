'use client'

import React from 'react'
import { DateTime } from 'luxon'
import { cn } from '@/lib/utils'
import { Button } from './Button'

interface BookingWeekViewProps {
  value: { date: string; startTime: string; endTime: string } | null
  onChange: (value: { date: string; startTime: string; endTime: string }) => void
  // 後でGoogleカレンダーから取得する予約データ
  bookedSlots?: Array<{ date: string; startTime: string; endTime: string }>
}

export function BookingWeekView({ value, onChange, bookedSlots = [] }: BookingWeekViewProps) {
  const [selectedWeek, setSelectedWeek] = React.useState(DateTime.local().startOf('week'))
  const [selectionStart, setSelectionStart] = React.useState<{ dayIndex: number; hour: number } | null>(null)
  const [selectionEnd, setSelectionEnd] = React.useState<{ dayIndex: number; hour: number } | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStartPos, setDragStartPos] = React.useState<{ dayIndex: number; hour: number } | null>(null)
  const [selectionMode, setSelectionMode] = React.useState<'start' | 'end'>('start')

  // デモ用の予約済みスロット（後でGoogleカレンダーAPIから取得）
  const demoBookedSlots = [
    { date: DateTime.local().plus({ days: 1 }).toISODate()!, startTime: '10:00', endTime: '12:00' },
    { date: DateTime.local().plus({ days: 1 }).toISODate()!, startTime: '14:00', endTime: '16:00' },
    { date: DateTime.local().plus({ days: 2 }).toISODate()!, startTime: '11:00', endTime: '13:00' },
    { date: DateTime.local().plus({ days: 2 }).toISODate()!, startTime: '15:00', endTime: '18:00' },
    { date: DateTime.local().plus({ days: 3 }).toISODate()!, startTime: '13:00', endTime: '15:00' },
    { date: DateTime.local().plus({ days: 4 }).toISODate()!, startTime: '10:00', endTime: '14:00' },
    { date: DateTime.local().plus({ days: 5 }).toISODate()!, startTime: '09:00', endTime: '11:00' },
    { date: DateTime.local().plus({ days: 5 }).toISODate()!, startTime: '16:00', endTime: '20:00' },
  ]

  const allBookedSlots = [...bookedSlots, ...demoBookedSlots]

  // 週の日付を生成
  const generateWeekDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(selectedWeek.plus({ days: i }))
    }
    return days
  }

  const weekDays = generateWeekDays()

  // 時間スロット（0時から23時まで）
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // 特定の日時が予約済みかチェック
  const isSlotBooked = (date: string, hour: number) => {
    return allBookedSlots.some(slot => {
      if (slot.date !== date) return false
      const startHour = parseInt(slot.startTime.split(':')[0])
      const endHour = parseInt(slot.endTime.split(':')[0])
      return hour >= startHour && hour < endHour
    })
  }

  // 選択範囲が予約済みスロットをまたぐかチェック
  const doesSelectionCrossBookedSlot = (startDay: number, startHour: number, endDay: number, endHour: number) => {
    const startTotal = startDay * 24 + startHour
    const endTotal = endDay * 24 + endHour
    const minTotal = Math.min(startTotal, endTotal)
    const maxTotal = Math.max(startTotal, endTotal)

    for (let total = minTotal; total < maxTotal; total++) {
      const dayIndex = Math.floor(total / 24)
      const hour = total % 24
      if (dayIndex < weekDays.length) {
        const date = weekDays[dayIndex].toISODate()!
        if (isSlotBooked(date, hour)) {
          return true
        }
      }
    }
    return false
  }

  // 選択範囲内かチェック
  const isInSelection = (dayIndex: number, hour: number) => {
    if (!selectionStart || !selectionEnd) return false
    
    const startTotal = selectionStart.dayIndex * 24 + selectionStart.hour
    const endTotal = selectionEnd.dayIndex * 24 + selectionEnd.hour
    const currentTotal = dayIndex * 24 + hour
    
    const minTotal = Math.min(startTotal, endTotal)
    const maxTotal = Math.max(startTotal, endTotal)
    
    return currentTotal >= minTotal && currentTotal < maxTotal
  }

  // 過去の時間かチェック
  const isPastTime = (date: DateTime, hour: number) => {
    const slotTime = date.set({ hour, minute: 0, second: 0 })
    return slotTime < DateTime.local()
  }

  // クリック処理
  const handleSlotClick = (dayIndex: number, hour: number) => {
    const day = weekDays[dayIndex]
    if (isPastTime(day, hour)) return
    if (isSlotBooked(day.toISODate()!, hour)) return

    // 選択モードに応じて処理
    if (!selectionStart || selectionMode === 'start') {
      // 開始時間を設定
      setSelectionStart({ dayIndex, hour })
      setSelectionEnd({ dayIndex, hour: hour + 1 })
      setSelectionMode('end')
    } else {
      // 終了時間を設定
      const newEnd = { dayIndex, hour: hour + 1 }
      const startTotal = selectionStart.dayIndex * 24 + selectionStart.hour
      const endTotal = newEnd.dayIndex * 24 + newEnd.hour
      
      if (endTotal <= startTotal) {
        // クリックした場所が開始時間より前の場合、新しい開始時間として設定
        setSelectionStart({ dayIndex, hour })
        setSelectionEnd({ dayIndex, hour: hour + 1 })
        setSelectionMode('end')
      } else {
        // 予約済みスロットをまたぐかチェック
        if (!doesSelectionCrossBookedSlot(selectionStart.dayIndex, selectionStart.hour, newEnd.dayIndex, newEnd.hour)) {
          setSelectionEnd(newEnd)
          // 選択完了後、新しい選択を開始できるようにする
          setSelectionMode('start')
        } else {
          // 予約済みスロットをまたぐ場合は、新しい開始時間として設定
          setSelectionStart({ dayIndex, hour })
          setSelectionEnd({ dayIndex, hour: hour + 1 })
          setSelectionMode('end')
        }
      }
    }
  }

  // ドラッグ開始処理
  const handleSlotMouseDown = (e: React.MouseEvent, dayIndex: number, hour: number) => {
    // 左クリックのみ処理
    if (e.button !== 0) return
    
    const day = weekDays[dayIndex]
    if (isPastTime(day, hour)) return
    if (isSlotBooked(day.toISODate()!, hour)) return

    // ドラッグ開始位置を記録
    e.preventDefault() // テキスト選択を防ぐ
    setDragStartPos({ dayIndex, hour })
    setSelectionStart({ dayIndex, hour })
    setSelectionEnd({ dayIndex, hour: hour + 1 })
    setSelectionMode('end')
  }

  // ドラッグ中の処理
  const handleSlotMouseEnter = (dayIndex: number, hour: number) => {
    if (!dragStartPos || !selectionStart) return
    
    // 実際にドラッグが開始されたかチェック
    if (!isDragging && (dragStartPos.dayIndex !== dayIndex || dragStartPos.hour !== hour)) {
      setIsDragging(true)
    }
    
    if (isDragging) {
      const newEnd = { dayIndex, hour: hour + 1 }
      
      // 予約済みスロットをまたぐかチェック
      if (!doesSelectionCrossBookedSlot(selectionStart.dayIndex, selectionStart.hour, newEnd.dayIndex, newEnd.hour)) {
        setSelectionEnd(newEnd)
      }
    }
  }

  const handleSlotMouseUp = (dayIndex: number, hour: number) => {
    // 実際にドラッグしたかチェック
    if (dragStartPos && !isDragging) {
      // ドラッグしていない場合はクリックとして処理
      handleSlotClick(dayIndex, hour)
    }
    
    setIsDragging(false)
    setDragStartPos(null)
  }

  // 選択確定
  const confirmSelection = () => {
    if (!selectionStart || !selectionEnd) return
    
    const startTotal = selectionStart.dayIndex * 24 + selectionStart.hour
    const endTotal = selectionEnd.dayIndex * 24 + selectionEnd.hour
    
    const minTotal = Math.min(startTotal, endTotal)
    const maxTotal = Math.max(startTotal, endTotal)
    
    const startDayIndex = Math.floor(minTotal / 24)
    const startHour = minTotal % 24
    const endDayIndex = Math.floor(maxTotal / 24)
    const endHour = maxTotal % 24
    
    const startDate = weekDays[startDayIndex].toISODate()!
    
    // 日をまたぐ場合の処理
    if (endDayIndex > startDayIndex) {
      // 複数日にまたがる予約は最初の日の終了時間として扱う
      onChange({
        date: startDate,
        startTime: `${startHour.toString().padStart(2, '0')}:00`,
        endTime: '24:00'
      })
    } else {
      onChange({
        date: startDate,
        startTime: `${startHour.toString().padStart(2, '0')}:00`,
        endTime: `${endHour.toString().padStart(2, '0')}:00`
      })
    }
  }

  // 週を変更
  const handleWeekChange = (direction: 'prev' | 'next') => {
    setSelectedWeek(prev => 
      direction === 'prev' 
        ? prev.minus({ weeks: 1 })
        : prev.plus({ weeks: 1 })
    )
    // 選択状態をリセット
    setSelectionStart(null)
    setSelectionEnd(null)
    setSelectionMode('start')
    setIsDragging(false)
    setDragStartPos(null)
  }

  const weekDayNames = ['月', '火', '水', '木', '金', '土', '日']

  // マウスイベントのグローバル登録
  React.useEffect(() => {
    if (dragStartPos) {
      const handleGlobalMouseUp = () => {
        setIsDragging(false)
        setDragStartPos(null)
      }
      document.addEventListener('mouseup', handleGlobalMouseUp)
      return () => {
        document.removeEventListener('mouseup', handleGlobalMouseUp)
      }
    }
  }, [dragStartPos])

  return (
    <div className="space-y-4">
      {/* 週ナビゲーション */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleWeekChange('prev')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            前の週
          </Button>
          
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900">
              {selectedWeek.toFormat('yyyy年MM月')}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedWeek.toFormat('dd日')} - {selectedWeek.plus({ days: 6 }).toFormat('dd日')}
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleWeekChange('next')}
            rightIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            }
          >
            次の週
          </Button>
        </div>

        {/* 凡例と操作モード */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
              <span className="text-gray-700 font-medium">空き</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span className="text-gray-700 font-medium">予約済み</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-700 font-medium">選択中</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <span className="text-gray-700 font-medium">過去</span>
            </div>
          </div>
          
          {selectionStart && (
            <div className="text-sm bg-blue-100 px-3 py-1 rounded-lg">
              <span className="font-semibold text-blue-800">
                {selectionMode === 'end' ? '📍 終了時間を選択してください' : '🔄 開始時間を選択してください'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 週カレンダー */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] table-fixed">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="sticky left-0 bg-gray-50 px-3 py-3 text-sm font-bold text-gray-700 text-left w-20 z-10">
                  時間
                </th>
                {weekDays.map((day, index) => {
                  const isToday = day.hasSame(DateTime.local(), 'day')
                  const isPast = day < DateTime.local().startOf('day')
                  
                  return (
                    <th
                      key={index}
                      className={cn(
                        "px-2 py-3 text-center border-l border-gray-200",
                        isToday && "bg-primary-50",
                        isPast && "bg-gray-50"
                      )}
                    >
                      <div className="text-sm font-bold text-gray-900">
                        {weekDayNames[index]}
                      </div>
                      <div className={cn(
                        "text-lg font-bold",
                        isToday ? "text-primary-600" : "text-gray-700"
                      )}>
                        {day.day}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="select-none">
              {hours.map((hour) => (
                <tr key={hour} className="border-b border-gray-100">
                  <td className="sticky left-0 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 border-r border-gray-200 w-20 z-10">
                    {hour.toString().padStart(2, '0')}:00
                  </td>
                  {weekDays.map((day, dayIndex) => {
                    const dateStr = day.toISODate()!
                    const isBooked = isSlotBooked(dateStr, hour)
                    const isSelected = isInSelection(dayIndex, hour)
                    const isPast = isPastTime(day, hour)
                    const isToday = day.hasSame(DateTime.local(), 'day')
                    
                    return (
                      <td
                        key={dayIndex}
                        onMouseDown={(e) => handleSlotMouseDown(e, dayIndex, hour)}
                        onMouseEnter={() => handleSlotMouseEnter(dayIndex, hour)}
                        onMouseUp={() => handleSlotMouseUp(dayIndex, hour)}
                        className={cn(
                          "relative h-12 border-l border-gray-200 transition-colors select-none",
                          !isPast && !isBooked && "cursor-pointer",
                          isPast && "bg-gray-50 cursor-not-allowed",
                          !isPast && !isBooked && !isSelected && "hover:bg-gray-100",
                          isBooked && "cursor-not-allowed",
                          isToday && !isPast && !isBooked && !isSelected && "bg-primary-50/20"
                        )}
                      >
                        {/* 予約済みの表示 */}
                        {isBooked && (
                          <div className="absolute inset-0 bg-red-100 border-y border-red-200"></div>
                        )}
                        
                        {/* 選択中の表示 */}
                        {isSelected && !isBooked && !isPast && (
                          <div className="absolute inset-0 bg-blue-500 opacity-60"></div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 選択情報と確定ボタン */}
      {selectionStart && selectionEnd && (
        <div className="bg-primary-50 rounded-xl border border-primary-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-900 font-bold text-base">
                📅 選択中の日時
              </p>
              <p className="text-primary-800 font-semibold mt-1">
                {(() => {
                  const startTotal = selectionStart.dayIndex * 24 + selectionStart.hour
                  const endTotal = selectionEnd.dayIndex * 24 + selectionEnd.hour
                  const minTotal = Math.min(startTotal, endTotal)
                  const maxTotal = Math.max(startTotal, endTotal)
                  
                  const startDayIndex = Math.floor(minTotal / 24)
                  const startHour = minTotal % 24
                  const endDayIndex = Math.floor(maxTotal / 24)
                  const endHour = maxTotal % 24
                  
                  const startDate = weekDays[startDayIndex]
                  const endDate = weekDays[Math.min(endDayIndex, 6)]
                  
                  if (startDayIndex === endDayIndex) {
                    // 同じ日
                    return `${startDate.toFormat('yyyy年MM月dd日')} ${startHour.toString().padStart(2, '0')}:00 〜 ${endHour.toString().padStart(2, '0')}:00 （${endHour - startHour}時間）`
                  } else {
                    // 日をまたぐ
                    return `${startDate.toFormat('MM月dd日')} ${startHour.toString().padStart(2, '0')}:00 〜 ${endDate.toFormat('MM月dd日')} ${endHour.toString().padStart(2, '0')}:00`
                  }
                })()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  // 選択をリセットして親コンポーネントにnullを通知
                  onChange({ date: '', startTime: '', endTime: '' })
                  setSelectionStart(null)
                  setSelectionEnd(null)
                  setSelectionMode('start')
                }}
              >
                キャンセル
              </Button>
              <Button
                variant="primary"
                onClick={confirmSelection}
              >
                この時間で確定
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 使用方法の説明 */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">使い方</p>
            <ul className="space-y-1">
              <li>• 1回目のクリック: 開始時間を選択</li>
              <li>• 2回目のクリック: 終了時間を選択</li>
              <li>• 予約済み時間帯をまたぐ選択はできません</li>
              <li>• 赤色の時間帯は予約済みです</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}