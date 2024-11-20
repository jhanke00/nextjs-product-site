import { Meta, StoryFn } from '@storybook/react';
import { Select, type SelectRootProps } from '.';

const meta: Meta<SelectRootProps> = {
  title: 'UI/Select',
  args: {
    placeholder: 'Select an Option',
  },
  argTypes: {
    placeholder: {
      type: 'string',
      description: 'The placeholder of the input',
    },
    onValueChange: {
      type: 'function',
      description: 'The callback function when the value changes',
    }
  }
}

export default meta;


export const Default: StoryFn<SelectRootProps> = (args) => {
  return (
    <Select.Root {...args}>
      <Select.Item value="1">Option 1</Select.Item>
      <Select.Item value="2">Option 2</Select.Item>
      <Select.Item value="3">Option 3</Select.Item>
    </Select.Root>
  )
}