import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { DatePickerWithRange } from '../date-picker-range'
import { DateRange } from 'react-day-picker'

const formSchema = z.object({
  destination: z.string(),
})

export type LocationsAndDateInputData = z.infer<typeof formSchema>

interface Props {
  onSubmit: (data: LocationsAndDateInputData) => void
  setDestination: (value: string) => void
  setDate: (date: DateRange | undefined) => void
  date?: DateRange
  destination: string
  editMode?: boolean
}

export const LocationsAndDateInput: React.FC<Props> = ({
  editMode,
  onSubmit,
  setDate,
  setDestination,
  date,
  destination,
}) => {
  const [isOnEditMode, setIsOnEditMode] = useState<boolean>(editMode || false)
  const { register, handleSubmit } = useForm<LocationsAndDateInputData>({
    resolver: zodResolver(formSchema),
    values: {
      destination,
    },
  })

  const handleOnSubmit = (data: LocationsAndDateInputData) => {
    setIsOnEditMode(false)
    setDestination(data.destination)
    onSubmit(data)
  }

  return (
    <form
      className='space-y-4'
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <fieldset className='flex items-center gap-4 bg-zinc-900 py-3 px-6 rounded-xl shadow-custom-border'>
        <label className='flex items-center gap-2 w-full'>
          <MapPin className='text-zinc-400' />
          <input
            readOnly={!isOnEditMode}
            {...register('destination')}
            type='text'
            placeholder='Para onde você vai?'
            className='bg-transparent outline-none w-full placeholder-zinc-400'
          />
        </label>
        <label className='flex items-center gap-2'>
          <Calendar className='text-zinc-400' />
          <DatePickerWithRange
            date={date}
            setDate={setDate}
            disabled={!isOnEditMode}
          />
        </label>
        <div className='w-[1px] bg-zinc-800 h-6' />
        {isOnEditMode && (
          <button
            type='submit'
            className='flex gap-2 items-center justify-center min-w-fit px-5 py-2 rounded-xl bg-lime-300 text-lime-950 hover:brightness-110 transition-colors'
          >
            Continuar
            <ArrowRight className='flex w-5 h-5 text-lime-950' />
          </button>
        )}
        {!isOnEditMode && (
          <button
            onClick={() => setIsOnEditMode(true)}
            className='flex gap-2 items-center justify-center min-w-fit px-5 py-2 rounded-xl bg-zinc-800 text-zinc-200 hover:brightness-110 transition-colors'
          >
            Alterar local/data
            <Settings2 className='flex w-5 h-5 text-zinc-200' />
          </button>
        )}
      </fieldset>
    </form>
  )
}
