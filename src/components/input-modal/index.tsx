import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { AtSign, Plus, UserRoundPlus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  inviteMail: z.string().email(),
})

type FormSchemaType = z.infer<typeof formSchema>

export const InputModal: React.FC<{
  onChange: (value: string[]) => void
}> = ({ onChange }) => {
  const [invites, setInvites] = useState<string[]>([])
  const { register, handleSubmit, reset } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  const handleAddInvite = (email: string) => {
    if (invites.includes(email)) return
    setInvites((prev) => [...prev, email])
  }

  const handleDeleteInvite = (email: string) => {
    setInvites((prev) => prev.filter((prevEmail) => prevEmail !== email))
  }

  const onSubmit = (data: FormSchemaType) => {
    handleAddInvite(data.inviteMail)
    reset()
  }

  useEffect(() => {
    onChange(invites)
  }, [invites])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className='flex items-center gap-2 w-full'>
          <UserRoundPlus className='text-zinc-400' />
          <input
            type='text'
            placeholder='Quem estará na viagem?'
            readOnly
            value={
              invites.length > 0
                ? `${invites.length} pessoa(s) convidada(s)`
                : ''
            }
            className='bg-transparent outline-none w-full placeholder-zinc-400'
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/50 backdrop-blur-sm fixed inset-0 animate-overlay-show' />
        <Dialog.Content className='flex flex-col fixed bg-zinc-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] rounded-xl h-[85vh] p-4 max-h-96 shadow-custom-border focus:outline-none'>
          <header className='space-y-2'>
            <Dialog.Title className='m-0 font-semibold text-lg'>
              Selecionar convidados
            </Dialog.Title>
            <Dialog.Description className='text-zinc-400 text-sm'>
              Os convidados irão receber e-mails para confirmar a participação
              na viagem.
            </Dialog.Description>

            <Dialog.Close
              asChild
              className='fixed top-4 right-4'
            >
              <button
                className='hover:bg-zinc-50/5 rounded-full p-1 transition-colors'
                aria-label='Close'
              >
                <X />
              </button>
            </Dialog.Close>
          </header>
          <div className='flex flex-col justify-between flex-1'>
            <ul className='mt-5 flex flex-wrap gap-2 overflow-auto max-h-[160px]'>
              {invites.map((invite) => (
                <li
                  key={invite}
                  className='bg-zinc-800 flex gap-2 px-2 py-1 rounded-md'
                >
                  <p>{invite}</p>
                  <button
                    className='hover:bg-zinc-50/5 rounded-full p-1 transition-colors'
                    aria-label='Close'
                    onClick={() => handleDeleteInvite(invite)}
                  >
                    <X className='w-4 h-4' />
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <div className='h-[1px] bg-zinc-800 my-5' />
              <form
                className='flex items-center gap-2 bg-zinc-950 p-3 rounded-xl border border-zinc-800'
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className='flex gap-2 w-full items-center'>
                  <AtSign className='w-5 h-5 text-zinc-400' />
                  <input
                    {...register('inviteMail')}
                    type='email'
                    placeholder='Digite o e-mail do convidado'
                    className='bg-transparent outline-none w-full placeholder-zinc-400'
                  />
                </label>
                <button
                  type='submit'
                  className='flex gap-2 items-center justify-center min-w-fit px-5 py-2 rounded-xl bg-lime-300 text-lime-950 hover:brightness-110 transition-colors'
                >
                  Convidar
                  <Plus className='flex w-5 h-5 text-lime-950' />
                </button>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
