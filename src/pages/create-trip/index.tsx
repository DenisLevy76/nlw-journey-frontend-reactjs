import { FormEvent, useState } from 'react'
import { ConfirmationModal } from '../../components/confirmation-modal'
import { InputModal } from '../../components/input-modal'
import { LogoLarge } from '../../components/logo-large-icon'
import { LocationsAndDateInput } from '../../components/locations-and-date-input'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'
import { useNavigate } from 'react-router-dom'

export const CreateTripPage: React.FC = () => {
  const navigate = useNavigate()
  const [isOnPassTwo, setIsOnPassTwo] = useState<boolean>(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [invites, setInvites] = useState<string[]>([])
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  const onSubmit = () => {
    setIsOnPassTwo(true)
  }

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log(destination)
    console.log(ownerName)
    console.log(ownerEmail)
    console.log(invites)
    console.log(eventStartAndEndDates)

    const response = await api.post<{ tripId: string }>('/trips', {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
      emails_to_invite: invites,
      owner_name: ownerName,
      owner_email: ownerEmail,
    })

    if ([200, 201].includes(response.status)) {
      navigate(`/trip-details/${response.data.tripId}`)
    }
  }

  return (
    <main className='h-screen flex items-center justify-center px-4 bg-pattern bg-no-repeat bg-center bg-cover'>
      <section className='space-y-10 text-center  w-full max-w-3xl'>
        <header>
          <span className='flex items-center justify-center mb-4'>
            <LogoLarge />
          </span>
          <strong className='font-normal text-lg'>
            Convide seus amigos e planeje sua próxima viagem!
          </strong>
        </header>
        <LocationsAndDateInput
          onSubmit={onSubmit}
          editMode={!isOnPassTwo}
          setDate={setEventStartAndEndDates}
          date={eventStartAndEndDates}
          setDestination={setDestination}
        />
        {isOnPassTwo && (
          <fieldset className='flex items-center gap-4 bg-zinc-900 py-3 px-6 rounded-xl shadow-custom-border'>
            <InputModal onChange={setInvites} />
            <ConfirmationModal
              setOwnerEmail={setOwnerEmail}
              setOwnerName={setOwnerName}
              onSubmit={onFormSubmit}
            />
          </fieldset>
        )}
        <footer>
          <p className='text-zinc-500 font-medium'>
            Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
            <br />
            com nossos <a href='#'>termos de uso</a> e{' '}
            <a href='#'>políticas de privacidade</a>.
          </p>
        </footer>
      </section>
    </main>
  )
}
