import { type ComponentProps, forwardRef } from "react";

export type InputProps = ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <fieldset data-testid='input-container' className="relative w-fit focus-within:ring-emerald-500 ring-1 ring-transparent border rounded">
    <input data-testid='input' type="text" className="rounded px-2 py-1 bg-slate-100 text-zinc-800 outline-none placeholder-zinc-600 placeholder:text-xs" {...props} ref={ref} />
  </fieldset>
))


Input.displayName = 'Input'