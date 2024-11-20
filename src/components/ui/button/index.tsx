import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from 'tailwind-variants'


const buttonContainer = tv({
  base: 'capitalize font-medium text-sm transition-colors rounded cursor-pointer px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      submit: 'bg-emerald-500 text-emerald-950 enabled:hover:bg-emerald-700',
      reset: 'bg-zinc-400 text-zinc-950 enabled:hover:bg-zinc-600',
    }
  },
  defaultVariants: {
    variant: 'submit'
  }
})


export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonContainer>



export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, ...props }, ref) => (
  <button type="button" {...props} className={buttonContainer({ class: className, variant })} ref={ref} />
))

Button.displayName = 'Button'