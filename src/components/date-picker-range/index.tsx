'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { ptBR } from 'date-fns/locale/pt-BR'

import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/button'
import { Calendar } from '../../components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover'

interface Props extends React.ComponentProps<'div'> {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
  disabled?: boolean
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
  disabled,
}: Props) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            disabled={disabled}
            className={cn(
              'w-[300px] justify-start disabled:text-zinc-400 text-left font-normal bg-transparent border-none hover:bg-transparent',
              !date && 'text-muted-foreground'
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', {
                    locale: ptBR,
                  })}{' '}
                  -{' '}
                  {format(date.to, 'LLL dd, y', {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', { locale: ptBR })
              )
            ) : (
              <span className='text-base text-zinc-400'>Quando?</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0 bg-zinc-900'
          align='start'
        >
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
