import * as Dialog from '@radix-ui/react-dialog'
import { tw } from '../../utils/tw'

export const ModalOverlay: React.FC<
  Dialog.DialogOverlayProps & React.RefAttributes<HTMLDivElement>
> = (props) => {
  return (
    <Dialog.Overlay
      {...props}
      className='bg-black/50 backdrop-blur-sm fixed inset-0 animate-overlay-show'
    />
  )
}

export const ModalRoot = Dialog.Root
export const ModalTrigger = Dialog.Trigger
export const ModalClose = Dialog.Close

export const ModalContent: React.FC<
  Dialog.DialogContentProps & React.RefAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  return (
    <Dialog.Portal>
      <ModalOverlay />
      <Dialog.Content
        className={tw([
          'flex flex-col fixed bg-zinc-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-4 max-h-96 shadow-custom-border focus:outline-none',
          className,
        ])}
        {...props}
      />
    </Dialog.Portal>
  )
}

export const ModalTitle: React.FC<
  Dialog.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>
> = (props) => {
  return (
    <Dialog.Title
      className='m-0 font-semibold text-lg'
      {...props}
    />
  )
}

export const ModalDescription: React.FC<
  Dialog.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>
> = (props) => {
  return (
    <Dialog.Description
      className='text-zinc-400 text-sm'
      {...props}
    />
  )
}
