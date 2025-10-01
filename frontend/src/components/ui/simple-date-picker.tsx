import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface SimpleDatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function SimpleDatePicker({
  date,
  setDate,
  placeholder = "Pick a date",
  className,
  disabled = false,
}: SimpleDatePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDate(new Date(e.target.value))
    } else {
      setDate(undefined)
    }
  }

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return ""
    return date.toISOString().split('T')[0]
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toLocaleDateString() : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <label htmlFor="date-input" className="text-sm font-medium">Select Date</label>
          <input
            id="date-input"
            type="date"
            value={formatDateForInput(date)}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
            aria-label="Select date"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
              "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDate(undefined)}
            >
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Also create a range picker variant
interface SimpleDateRangePickerProps {
  from: Date | undefined
  to: Date | undefined
  onSelect: (range: { from: Date | undefined; to: Date | undefined }) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function SimpleDateRangePicker({
  from,
  to,
  onSelect,
  placeholder = "Pick a date range",
  className,
  disabled = false,
}: SimpleDateRangePickerProps) {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrom = e.target.value ? new Date(e.target.value) : undefined
    onSelect({ from: newFrom, to })
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTo = e.target.value ? new Date(e.target.value) : undefined
    onSelect({ from, to: newTo })
  }

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return ""
    return date.toISOString().split('T')[0]
  }

  const formatDateRange = () => {
    if (from && to) {
      return `${from.toLocaleDateString()} - ${to.toLocaleDateString()}`
    } else if (from) {
      return `${from.toLocaleDateString()} - ...`
    } else {
      return placeholder
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !from && !to && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{formatDateRange()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="text-sm font-medium">Select Date Range</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="from-date" className="text-xs font-medium text-muted-foreground">From</label>
              <input
                id="from-date"
                type="date"
                value={formatDateForInput(from)}
                onChange={handleFromChange}
                min={new Date().toISOString().split('T')[0]}
                aria-label="Start date"
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                  "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
                  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="to-date" className="text-xs font-medium text-muted-foreground">To</label>
              <input
                id="to-date"
                type="date"
                value={formatDateForInput(to)}
                onChange={handleToChange}
                min={from ? formatDateForInput(from) : new Date().toISOString().split('T')[0]}
                aria-label="End date"
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                  "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
                  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                )}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect({ from: undefined, to: undefined })}
            >
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}