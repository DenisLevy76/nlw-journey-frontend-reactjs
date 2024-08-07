import { ArrowRight, Mail, User, X } from 'lucide-react'
import {
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalRoot,
  ModalTitle,
  ModalTrigger,
} from '../modal'
import { Input } from '../input'
import { Button } from '../button'
import { FormEvent } from 'react'

interface Props {
  setOwnerName: (value: string) => void
  setOwnerEmail: (value: string) => void
  onSubmit: (event: FormEvent) => void
}

export const ConfirmationModal: React.FC<Props> = ({
  setOwnerEmail,
  setOwnerName,
  onSubmit,
}) => {
  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <button className='flex gap-2 min-w-fit items-center justify-center px-5 py-2 rounded-xl bg-lime-300 text-lime-950 hover:brightness-110 transition-colors'>
          Confirmar viagem
          <ArrowRight className='flex w-5 h-5 text-lime-950' />
        </button>
      </ModalTrigger>
      <ModalContent className='max-w-xl'>
        <header className='mb-5 flex flex-col gap-2 relative'>
          <ModalTitle>Confirmar criação da viagem</ModalTitle>
          <ModalDescription>
            Para concluir a criação da viagem para{' '}
            <strong>Florianópolis, Brasil</strong> nas datas de{' '}
            <strong>16 a 27 de Agosto de 2024</strong> preencha seus dados
            abaixo:
          </ModalDescription>
          <ModalClose asChild>
            <button className='absolute top-0 right-0'>
              <X className='size-5 text-white' />
            </button>
          </ModalClose>
        </header>
        <form
          className='flex flex-col gap-2'
          onSubmit={onSubmit}
        >
          <Input
            type='text'
            placeholder='Seu nome completo'
            onChange={(event) => setOwnerName(event.target.value)}
            prefixIcon={<User className='size-5' />}
          />
          <Input
            type='text'
            placeholder='Seu e-mail pessoal'
            onChange={(event) => setOwnerEmail(event.target.value)}
            prefixIcon={<Mail className='size-5' />}
          />
          <Button className='w-full'>Confirmar criação da viagem</Button>
        </form>
      </ModalContent>
    </ModalRoot>
  )
}
