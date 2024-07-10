import {
  ComponentProps,
  forwardRef,
  ReactNode,
  ForwardRefRenderFunction,
} from 'react'

interface Props extends ComponentProps<'input'> {
  prefixIcon?: ReactNode
  suffixIcon?: ReactNode
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { prefixIcon, suffixIcon, ...props },
  ref
) => {
  return (
    <label className='flex items-center gap-2 bg-zinc-950 p-3 rounded-xl border border-zinc-800'>
      {prefixIcon}
      <input
        ref={ref}
        className='bg-transparent outline-none w-full placeholder-zinc-400'
        {...props}
      />
      {suffixIcon}
    </label>
  )
}

export const Input = forwardRef(InputComponent)

Input.displayName = 'Input'
