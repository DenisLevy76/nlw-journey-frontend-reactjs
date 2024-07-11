import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { ConfirmationModal } from '../../components/confirmation-modal'
import { InputModal } from '../../components/input-modal'
import { LogoLarge } from '../../components/logo-large-icon'

export const CreateTripPage: React.FC = () => {
  const [isOnPassTwo, setIsOnPassTwo] = useState<boolean>(false)

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
        <form className='space-y-4'>
          <fieldset className='flex items-center gap-4 bg-zinc-900 py-3 px-6 rounded-xl shadow-custom-border'>
            <label className='flex items-center gap-2 w-full'>
              <MapPin className='text-zinc-400' />
              <input
                readOnly={isOnPassTwo}
                type='text'
                placeholder='Para onde você vai?'
                className='bg-transparent outline-none w-full placeholder-zinc-400'
              />
            </label>
            <label className='flex items-center gap-2'>
              <Calendar className='text-zinc-400' />
              <input
                readOnly={isOnPassTwo}
                type='text'
                placeholder='Quando?'
                className='bg-transparent outline-none w-full placeholder-zinc-400'
              />
            </label>
            <div className='w-[1px] bg-zinc-800 h-6' />
            {!isOnPassTwo && (
              <button
                onClick={() => setIsOnPassTwo(true)}
                className='flex gap-2 items-center justify-center min-w-fit px-5 py-2 rounded-xl bg-lime-300 text-lime-950 hover:brightness-110 transition-colors'
              >
                Continuar
                <ArrowRight className='flex w-5 h-5 text-lime-950' />
              </button>
            )}
            {isOnPassTwo && (
              <button
                onClick={() => setIsOnPassTwo(false)}
                className='flex gap-2 items-center justify-center min-w-fit px-5 py-2 rounded-xl bg-zinc-800 text-zinc-200 hover:brightness-110 transition-colors'
              >
                Alterar local/data
                <Settings2 className='flex w-5 h-5 text-zinc-200' />
              </button>
            )}
          </fieldset>
          {isOnPassTwo && (
            <fieldset className='flex items-center gap-4 bg-zinc-900 py-3 px-6 rounded-xl shadow-custom-border'>
              <InputModal />
              <ConfirmationModal />
            </fieldset>
          )}
        </form>
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
