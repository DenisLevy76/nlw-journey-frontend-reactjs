import { CircleCheck, CircleDashed, Link2, Plus } from 'lucide-react'
import { Button } from '../../../../components/button'

export const TripDetailsAside: React.FC = () => {
  return (
    <aside>
      <section>
        <h2 className='text-xl text-zinc-50 font-semibold mb-6'>
          Links importantes
        </h2>
        <ul className='max-h-52 overflow-auto space-y-3'>
          <li className='flex items-center justify-between'>
            <div>
              <strong className='text-base font-medium text-zinc-100'>
                Reserva do AirBnB
              </strong>
              <p className='overflow-hidden text-ellipsis text-xs text-zinc-400'>
                https://www.airbnb.com.br/rooms/104700011
              </p>
            </div>
            <button>
              <Link2 className='size-5 text-zinc-400' />
            </button>
          </li>
        </ul>
        <Button className='bg-zinc-900 text-zinc-200 w-full mt-6'>
          <Plus className='size-5 text-zinc-200' />
          Cadastrar novo link
        </Button>
      </section>
      <div className='h-[1px] w-full bg-zinc-800 my-6' />
      <section>
        <h2 className='text-xl text-zinc-50 font-semibold mb-6'>Convidados</h2>
        <ul className='max-h-52 overflow-auto space-y-3'>
          <li className='flex items-center justify-between'>
            <div>
              <strong className='text-base font-medium text-zinc-100'>
                Jorge Augusto Gustô
              </strong>
              <p className='overflow-hidden text-ellipsis text-xs text-zinc-400'>
                jorge.augusto@gmail.com
              </p>
            </div>
            <button>
              {false ? (
                <CircleCheck className='size-5 text-lime-300' />
              ) : (
                <CircleDashed className='size-5 text-zinc-400' />
              )}
            </button>
          </li>
        </ul>
      </section>
    </aside>
  )
}
