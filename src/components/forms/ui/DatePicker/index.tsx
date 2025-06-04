"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"
import { type Control, Controller } from "react-hook-form"

import { useFormError } from "../../FormErrorsProvider"

interface DatePickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  endDate?: Date | null
  label: string
  name: string
  startDate?: Date | null
}

export function DatePicker({
  control,
  endDate,
  label,
  name,
  startDate,
}: DatePickerProps) {
  const error = useFormError(name)

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="grid max-w-xl gap-2">
          <Popover onOpenChange={setIsCalendarOpen} open={isCalendarOpen}>
            <Label>{label}</Label>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  "justify-start text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
                variant={"outline"}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "PPP", {
                    locale: es,
                  })
                ) : (
                  <span>Selecciona una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            {error ? (
              <Label>
                <span className="text-red-500">
                  {error.message?.toString()}
                </span>
              </Label>
            ) : null}
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                disabled={{
                  after: endDate ?? undefined,
                  before: startDate ?? undefined,
                }}
                locale={es}
                mode="single"
                onSelect={(date) => {
                  field.onChange(date)
                  setIsCalendarOpen(false)
                }}
                selected={field.value}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  )
}
