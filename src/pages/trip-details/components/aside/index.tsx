import { CircleCheck, CircleDashed, Link2, Plus } from 'lucide-react'
import { Button } from '../../../../components/button'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../../../lib/axios'
import { useParams } from 'react-router-dom'

interface Link {
  id: string
  title: string
  url: string
}

interface Participant {
  id: string
  name: string
  email: string
  is_confirmed: boolean
}

export const TripDetailsAside: React.FC = () => {
  const { id } = useParams()

  const [links, setList] = useState<Link[] | null>(null)
  const [participants, setParticipants] = useState<Participant[] | null>(null)

  const fetchParticipants = useCallback(async () => {
    const { data } = await api.get<{ participants: Participant[] }>(
      `/trips/${id}/participants`
    )

    setParticipants(data?.participants)
  }, [id])

  const fetchTripLinks = useCallback(async () => {
    const { data } = await api.get<{ links: Link[] }>(`/trips/${id}/activities`)

    setList(data?.links)
  }, [id])

  useEffect(() => {
    fetchParticipants()
    fetchTripLinks()
  }, [fetchParticipants, fetchTripLinks])

  return (
    <aside>
      <section>
        <h2 className='text-xl text-zinc-50 font-semibold mb-6'>
          Links importantes
        </h2>
        <ul className='max-h-52 overflow-auto space-y-3'>
          {links?.length > 0 ? (
            links?.map((link) => (
              <li
                key={link.id}
                className='flex items-center justify-between'
              >
                <div>
                  <strong className='text-base font-medium text-zinc-100'>
                    {link.title}
                  </strong>
                  <p className='overflow-hidden text-ellipsis text-xs text-zinc-400'>
                    {link.url}
                  </p>
                </div>
                <button>
                  <Link2
                    className='size-5 text-zinc-400'
                    onClick={() => navigator.clipboard.writeText(link.url)}
                  />
                </button>
              </li>
            ))
          ) : (
            <span className='text-zinc-400 text-sm'>
              Nenhum link encontrado
            </span>
          )}
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
          {participants && participants.length > 0 ? (
            participants.map((participant) => (
              <li
                className='flex items-center justify-between'
                key={participant.id}
              >
                <div>
                  <strong className='text-base font-medium text-zinc-100'>
                    {participant.name}
                  </strong>
                  <p className='overflow-hidden text-ellipsis text-xs text-zinc-400'>
                    {participant.email}
                  </p>
                </div>
                <button>
                  {participant.is_confirmed ? (
                    <CircleCheck className='size-5 text-lime-300' />
                  ) : (
                    <CircleDashed className='size-5 text-zinc-400' />
                  )}
                </button>
              </li>
            ))
          ) : (
            <span className='text-zinc-400 text-sm'>
              Nenhum link encontrado
            </span>
          )}
        </ul>
      </section>
    </aside>
  )
}
