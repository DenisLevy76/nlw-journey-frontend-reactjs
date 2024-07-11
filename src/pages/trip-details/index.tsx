import { CircleCheck, Plus } from 'lucide-react'
import { Button } from '../../components/button'
import { LocationsAndDateInput } from '../../components/locations-and-date-input'
import { TripDetailsAside } from './components/aside'
import { useCallback, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'

export interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export const TripDetailsPage: React.FC = () => {
  const { id } = useParams()
  const [details, setDetails] = useState<null | Trip>(null)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()
  const [destination, setDestination] = useState('')

  const fetchTripDetails = useCallback(async () => {
    const { data } = await api.get<{ trip: Trip }>(`/trips/${id}`)

    if (data?.trip)
      setEventStartAndEndDates({
        from: new Date(data.trip?.starts_at || ''),
        to: new Date(data.trip?.ends_at || ''),
      })

    setDetails(data.trip)
  }, [id])

  useEffect(() => {
    fetchTripDetails()
  }, [fetchTripDetails])

  return (
    <main className='max-w-[1100px] mx-auto p-8'>
      <header>
        <LocationsAndDateInput
          onSubmit={() => {}}
          setDate={setEventStartAndEndDates}
          date={eventStartAndEndDates}
          setDestination={setDestination}
        />
      </header>
      <div className='grid grid-cols-[1fr_350px] gap-16 mt-8'>
        <div>
          <header className='flex justify-between'>
            <h1 className='text-3xl font-semibold text-zinc-50'>Atividades</h1>
            <Button>
              <Plus />
              Cadastrar atividade
            </Button>
          </header>
          <section className='mt-6'>
            <ol className='flex flex-col gap-8'>
              <li className='flex flex-col gap-3'>
                <div className='flex gap-2 items-end'>
                  <h3 className='text-xl text-zinc-400 font-semibold leading-5'>
                    Dia 17
                  </h3>
                  <span className='text-zinc-500 text-xs'>Sábado</span>
                </div>
                {true ? (
                  <ol>
                    <li className='flex items-center bg-zinc-900 gap-2 px-4 py-2.5 rounded-xl shadow-custom-border'>
                      <CircleCheck className='size-5 text-lime-300' />
                      <p className='text-zinc-100 w-full'>Corrida de Kart</p>
                      <time
                        dateTime='2024-07-11T01:16:10.094Z'
                        className='text-zinc-400'
                      >
                        01:16h
                      </time>
                    </li>
                  </ol>
                ) : (
                  <p className='text-zinc-500 text-sm'>
                    Nenhuma atividade cadastrada nessa data.
                  </p>
                )}
              </li>
            </ol>
          </section>
        </div>
        <TripDetailsAside />
      </div>
    </main>
  )
}
