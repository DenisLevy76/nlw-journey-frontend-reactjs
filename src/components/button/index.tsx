// import { Container } from './styles'

import { ComponentProps } from 'react'
import { tw } from '../../utils/tw'

export const Button: React.FC<ComponentProps<'button'>> = ({
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={tw([
        'flex gap-2 min-w-fit shadow-custom-border items-center justify-center px-5 py-2 rounded-xl bg-lime-300 text-lime-950 hover:brightness-110 transition-colors',
        className,
      ])}
    ></button>
  )
}
