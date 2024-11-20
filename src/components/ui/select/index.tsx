import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectRadix from "@radix-ui/react-select";
import { forwardRef } from "react";

export type SelectRootProps = SelectRadix.SelectProps & {
  placeholder?: string
}

export type SelectItemProps = SelectRadix.SelectItemProps

function SelectRoot({ children, placeholder, ...props }: SelectRootProps) {
  return (
    <SelectRadix.Root data-testid='select-root' {...props}>
      <SelectRadix.Trigger data-testid='select-trigger' className='flex h-9 py-2 w-full items-center justify-between gap-2 rounded px-3 outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-100 bg-slate-100 data-[placeholder]:text-xs data-[placeholder]:text-zinc-600'>
        <SelectRadix.Value placeholder={placeholder} className="text-zinc-800 text-sm" />
        <SelectRadix.Icon>
          <ChevronDownIcon className='size-4 text-zinc-800' />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>

      <SelectRadix.Portal >
        <SelectRadix.Content sideOffset={8} className='z-10 w-[--radix-select-trigger-width] overflow-hidden rounded border border-emerald-300 bg-slate-100 max-h-96' position="popper" side="bottom">
          <SelectRadix.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
            <ChevronUpIcon className='size-4 text-zinc-800' />
          </SelectRadix.ScrollUpButton>

          <SelectRadix.Viewport>
            {children}
          </SelectRadix.Viewport>

          <SelectRadix.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
            <ChevronDownIcon className='size-4 text-zinc-800' />
          </SelectRadix.ScrollDownButton>

        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardRef) => {
    return (
      <SelectRadix.Item {...props} data-testid={`select-item-${props.value}`} ref={forwardRef} className='flex items-center justify-between gap-2 py-2.5 px-2 outline-none data-[highlighted]:bg-zinc-200 data-[highlighted]:outline-none' >
        <SelectRadix.ItemText asChild>
          <span className='text-sm text-zinc-600' >{children}</span>
        </SelectRadix.ItemText>

        <SelectRadix.ItemIndicator>
          <CheckIcon className='size-4 text-emerald-700' />
        </SelectRadix.ItemIndicator>
      </SelectRadix.Item>
    )
  },
)

SelectItem.displayName = 'SelectItem'

export const Select = {
  Root: SelectRoot,
  Item: SelectItem,
}