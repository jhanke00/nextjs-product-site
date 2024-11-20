import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '.'

describe('<Button />', () => {
  it('should render with default variant (submit)', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })

    expect(button).toHaveClass('bg-emerald-500')
    expect(button).toHaveClass('text-emerald-950')
    expect(button).toBeInTheDocument()
  })

  it('should render with reset variant', () => {
    render(<Button variant="reset">Reset</Button>)

    const button = screen.getByRole('button', { name: /reset/i })

    expect(button).toHaveClass('bg-zinc-400')
    expect(button).toHaveClass('text-zinc-950')
    expect(button).toBeInTheDocument()
  })

  it('should apply additional className when provided', () => {
    render(<Button className="custom-class">Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })

    expect(button).toHaveClass('custom-class')
  })

  it('should forward ref correctly', () => {
    const ref = jest.fn()

    render(<Button ref={ref}>Click me</Button>)

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })

  it('should handle click events', async () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })

    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
    expect(button).toHaveClass('disabled:cursor-not-allowed')
  })

  it('should spread additional props to button element', () => {
    render(<Button data-testid="custom-button" aria-label="Custom Button">Click me</Button>)

    const button = screen.getByTestId('custom-button')

    expect(button).toHaveAttribute('aria-label', 'Custom Button')
  })

  it('should have type="button" by default', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })

    expect(button).toHaveAttribute('type', 'button')
  })

  it('should allow type override', () => {
    render(<Button type="submit">Submit</Button>)

    const button = screen.getByRole('button', { name: /submit/i })

    expect(button).toHaveAttribute('type', 'submit')
  })
})