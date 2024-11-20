import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '.'
import { createRef } from 'react'

describe('<Input />', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<Input />)

    const input = getByTestId('input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input.parentElement).toHaveClass('relative', 'w-fit', 'border', 'rounded')
  })

  it('accepts and renders with placeholder', () => {
    render(<Input placeholder="Enter product name" />)

    expect(screen.getByPlaceholderText('Enter product name')).toBeInTheDocument()
  })

  it('accepts and renders with custom type', () => {
    const { getByTestId } = render(<Input type="email" />)

    expect(getByTestId('input')).toHaveAttribute('type', 'email')
  })

  it('handles user input correctly', () => {
    const { getByTestId } = render(<Input />)

    const input = getByTestId('input')

    fireEvent.change(input, { target: { value: 'Test Product' } })

    expect(input).toHaveValue('Test Product')
  })

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLInputElement>()
    const { getByTestId } = render(<Input ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(getByTestId('input'))
  })

  it('applies focus styles to fieldset when input is focused', () => {
    const { getByTestId } = render(<Input />)

    const input = getByTestId('input')
    const fieldset = input.parentElement

    fireEvent.focus(input)

    expect(fieldset).toHaveClass('focus-within:ring-emerald-500')
  })

  it('handles blur event correctly', () => {
    const { getByTestId } = render(<Input />)

    const input = getByTestId('input')

    fireEvent.focus(input)
    fireEvent.blur(input)

    expect(input).not.toHaveFocus()
  })

  it('passes through additional props to input element', () => {
    const { getByTestId } = render(<Input aria-label="Product input" />)

    const input = getByTestId('input')
    expect(input).toHaveAttribute('aria-label', 'Product input')
  })

  it('applies correct base styling classes', () => {
    const { getByTestId } = render(<Input />)

    const input = getByTestId('input')
    expect(input).toHaveClass(
      'rounded',
      'px-2',
      'py-1',
      'bg-slate-100',
      'text-zinc-800',
      'outline-none',
      'placeholder-zinc-600',
      'placeholder:text-xs'
    )
  })

  it('handles multiple input changes', () => {
    const { getByTestId } = render(<Input />)

    const input = getByTestId('input')

    fireEvent.change(input, { target: { value: 'First' } })
    expect(input).toHaveValue('First')

    fireEvent.change(input, { target: { value: 'Second' } })
    expect(input).toHaveValue('Second')
  })

  it('renders with ring styles', () => {
    const { getByTestId } = render(<Input />)

    const fieldset = getByTestId('input').parentElement

    expect(fieldset).toHaveClass('ring-1', 'ring-transparent')
  })
})