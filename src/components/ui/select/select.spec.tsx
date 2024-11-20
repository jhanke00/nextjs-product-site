import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import { Select } from '.'

const renderSelect = (placeholder?: string) => {
  render(
    <Select.Root placeholder={placeholder}>
      <Select.Item value="1">Option 1</Select.Item>
      <Select.Item value="2">Option 2</Select.Item>
      <Select.Item value="3">Option 3</Select.Item>
    </Select.Root>
  )
}

describe('<Select />', () => {
  it('renders with default state', () => {
    renderSelect()

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveClass(
      'flex',
      'h-9',
      'py-2',
      'w-full',
      'items-center',
      'justify-between',
      'gap-2',
      'rounded',
      'px-3',
      'bg-slate-100'
    )
  })

  it('renders with placeholder', () => {
    renderSelect('Select an option')

    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('data-placeholder')
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('shows options when clicked', () => {
    renderSelect()

    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('updates value when option is selected', () => {
    renderSelect('Select an option')

    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)

    const option = screen.getByText('Option 1')
    fireEvent.click(option)

    expect(trigger).toHaveTextContent('Option 1')
  })

  it('closes dropdown when option is selected', () => {
    renderSelect()

    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)

    const option = screen.getByText('Option 1')
    fireEvent.click(option)

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows check icon for selected option', () => {
    renderSelect()

    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)

    const option = screen.getByText('Option 1')
    fireEvent.click(option)

    // Reopen to check the selected state
    fireEvent.click(trigger)
    const checkIcon = screen.getByRole('listbox').querySelector('.text-emerald-700')
    expect(checkIcon).toBeInTheDocument()
  })
})
