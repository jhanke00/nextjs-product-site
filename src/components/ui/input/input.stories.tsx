import { Meta, StoryObj } from '@storybook/react';
import { Input, type InputProps } from '.';

const meta: Meta<InputProps> = {
  //@ts-ignore
  component: Input,
  title: 'UI/Input',
  args: {
    placeholder: 'Enter product name',
  },
  argTypes: {
    placeholder: {
      type: 'string',
      description: 'The placeholder of the input',
    }
  }
}

export default meta;


export const Default: StoryObj<InputProps> = {
  args: {
    placeholder: 'Lorem ipsum dolor sit amet',
  },
}
