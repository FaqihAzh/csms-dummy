// components/molecules/pagination/pagination.test.tsx
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PaginationController } from './pagination'

describe('PaginationController', () => {
  const mockOnPageChange = vi.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  describe('Page Display Logic', () => {
    it('shows pages 1-5 when current page is 1 and total is 10', () => {
      render(
        <PaginationController
          currentPage={1}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.queryByText('6')).not.toBeInTheDocument()
    })

    it('shows pages 1-5 when current page is 5 and total is 10', () => {
      render(
        <PaginationController
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.queryByText('6')).not.toBeInTheDocument()
    })

    it('shows pages 6-10 when current page is 6 and total is 10', () => {
      render(
        <PaginationController
          currentPage={6}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.queryByText('5')).not.toBeInTheDocument()
      expect(screen.getByText('6')).toBeInTheDocument()
      expect(screen.getByText('7')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('9')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('shows all pages when total pages is less than 5', () => {
      render(
        <PaginationController
          currentPage={2}
          totalPages={3}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  describe('Navigation Buttons', () => {
    it('disables first and previous buttons on first page', () => {
      render(
        <PaginationController
          currentPage={1}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      const firstButton = screen.getByLabelText('Go to first page')
      const previousButton = screen.getByLabelText('Go to previous page')

      expect(firstButton).toHaveClass('pointer-events-none opacity-50')
      expect(previousButton).toHaveClass('pointer-events-none opacity-50')
    })

    it('enables all buttons on middle page', () => {
      render(
        <PaginationController
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      const firstButton = screen.getByLabelText('Go to first page')
      const previousButton = screen.getByLabelText('Go to previous page')
      const nextButton = screen.getByLabelText('Go to next page')
      const lastButton = screen.getByLabelText('Go to last page')

      expect(firstButton).not.toHaveClass('pointer-events-none')
      expect(previousButton).not.toHaveClass('pointer-events-none')
      expect(nextButton).not.toHaveClass('pointer-events-none')
      expect(lastButton).not.toHaveClass('pointer-events-none')
    })

    it('disables last and next buttons on last page', () => {
      render(
        <PaginationController
          currentPage={10}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      const nextButton = screen.getByLabelText('Go to next page')
      const lastButton = screen.getByLabelText('Go to last page')

      expect(nextButton).toHaveClass('pointer-events-none opacity-50')
      expect(lastButton).toHaveClass('pointer-events-none opacity-50')
    })
  })

  describe('User Interactions', () => {
    it('calls onPageChange when clicking page number', async () => {
      const user = userEvent.setup()
      render(
        <PaginationController
          currentPage={1}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      await user.click(screen.getByText('3'))
      expect(mockOnPageChange).toHaveBeenCalledWith(3)
    })

    it('calls onPageChange with page 1 when clicking first button', async () => {
      const user = userEvent.setup()
      render(
        <PaginationController
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      await user.click(screen.getByLabelText('Go to first page'))
      expect(mockOnPageChange).toHaveBeenCalledWith(1)
    })

    it('calls onPageChange with last page when clicking last button', async () => {
      const user = userEvent.setup()
      render(
        <PaginationController
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      await user.click(screen.getByLabelText('Go to last page'))
      expect(mockOnPageChange).toHaveBeenCalledWith(10)
    })

    it('calls onPageChange with previous page when clicking previous button', async () => {
      const user = userEvent.setup()
      render(
        <PaginationController
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      await user.click(screen.getByLabelText('Go to previous page'))
      expect(mockOnPageChange).toHaveBeenCalledWith(4)
    })

    it('calls onPageChange with next page when clicking next button', async () => {
      const user = userEvent.setup()
      render(
        <PaginationController
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      await user.click(screen.getByLabelText('Go to next page'))
      expect(mockOnPageChange).toHaveBeenCalledWith(6)
    })

    it('does not call onPageChange when clicking disabled buttons', async () => {
      const user = userEvent.setup()
      render(
        <PaginationController
          currentPage={1}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      await user.click(screen.getByLabelText('Go to first page'))
      await user.click(screen.getByLabelText('Go to previous page'))
      
      expect(mockOnPageChange).not.toHaveBeenCalled()
    })
  })

  describe('Active Page Styling', () => {
    it('marks current page as active', () => {
      render(
        <PaginationController
          currentPage={3}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      const activePage = screen.getByText('3')
      expect(activePage).toHaveAttribute('aria-current', 'page')
      expect(activePage).toHaveAttribute('data-active', 'true')
    })
  })
})