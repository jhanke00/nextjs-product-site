import { Meta, StoryObj } from '@storybook/react';
import { Button, type ButtonProps } from '.';

const meta: Meta<ButtonProps> = {
  //@ts-ignore
  component: Button,
  title: 'UI/Button',
  args: {
    children: 'Click me',
    variant: 'submit',
    type: 'button',
  },
  argTypes: {
    variant: {
      options: ['submit', 'reset'],
      control: { type: 'radio' },
      description: 'The variant of the button',
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'radio' },
      description: 'The type of the button',
    }
  }
}

export default meta;


export const Submit: StoryObj<ButtonProps> = {
  args: {
    children: 'Submit',
    variant: 'submit',
  },
}

export const Reset: StoryObj<ButtonProps> = {
  args: {
    children: 'Reset',
    variant: 'reset',
  },
}