// import { Container } from './styles'

import { ComponentProps } from 'react'

export const Button: React.FC<ComponentProps<'button'>> = (props) => {
  return (
    <button
      {...props}
      className='flex w-full gap-2 min-w-fit items-center justify-center px-5 py-2 rounded-xl bg-lime-300 text-lime-950 hover:brightness-110 transition-colors'
    ></button>
  )
}
