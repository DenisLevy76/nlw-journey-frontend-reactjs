import { useState } from 'react'
import { ConfirmationModal } from '../../components/confirmation-modal'
import { InputModal } from '../../components/input-modal'
import { LogoLarge } from '../../components/logo-large-icon'
import {
  LocationsAndDateInput,
  LocationsAndDateInputData,
} from '../../components/locations-and-date-input'

export const CreateTripPage: React.FC = () => {
  const [isOnPassTwo, setIsOnPassTwo] = useState<boolean>(false)

  const onSubmit = (data: LocationsAndDateInputData) => {
    console.log(data.when)
    setIsOnPassTwo(true)
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
        />
        {isOnPassTwo && (
          <fieldset className='flex items-center gap-4 bg-zinc-900 py-3 px-6 rounded-xl shadow-custom-border'>
            <InputModal />
            <ConfirmationModal />
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
