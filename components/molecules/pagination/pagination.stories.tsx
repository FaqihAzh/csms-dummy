import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PaginationController } from './pagination'

const meta: Meta<typeof PaginationController> = {
  title: 'Components/UI/Pagination',
  component: PaginationController,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof PaginationController>

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-gray-600">
          Current Page: {page}
        </div>
        <PaginationController
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
        />
      </div>
    )
  },
}

export const FirstPage: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-gray-600">
          Halaman {page} dari 10 (Menampilkan 1-5)
        </div>
        <PaginationController
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
        />
      </div>
    )
  },
}

export const MiddlePageFirstGroup: Story = {
  render: () => {
    const [page, setPage] = useState(3)
    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-gray-600">
          Halaman {page} dari 10 (Menampilkan 1-5)
        </div>
        <PaginationController
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
        />
      </div>
    )
  },
}

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = useState(10)
    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-gray-600">
          Halaman {page} dari 10 (Menampilkan 6-10)
        </div>
        <PaginationController
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
        />
      </div>
    )
  },
}

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(2)
    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-gray-600">
          Halaman {page} dari 3 (Kurang dari 5 halaman)
        </div>
        <PaginationController
          currentPage={page}
          totalPages={3}
          onPageChange={setPage}
        />
      </div>
    )
  },
}

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(15)
    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-gray-600">
          Halaman {page} dari 50 (Menampilkan 11-15)
        </div>
        <PaginationController
          currentPage={page}
          totalPages={50}
          onPageChange={setPage}
        />
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const totalPages = 20
    
    const currentGroup = Math.floor((page - 1) / 5) + 1
    const totalGroups = Math.ceil(totalPages / 5)
    const startPage = (currentGroup - 1) * 5 + 1
    const endPage = Math.min(currentGroup * 5, totalPages)
    
    return (
      <div className="space-y-8 p-8">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Interactive Pagination Demo</h3>
          <p className="text-sm text-gray-600">
            Current Page: <span className="font-bold">{page}</span> of {totalPages}
          </p>
          <p className="text-xs text-gray-500">
            Showing pages {startPage}-{endPage} (Group {currentGroup} of {totalGroups})
          </p>
        </div>
        
        <PaginationController
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => setPage(1)}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Page 1
          </button>
          <button
            onClick={() => setPage(6)}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Page 6
          </button>
          <button
            onClick={() => setPage(11)}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Page 11
          </button>
          <button
            onClick={() => setPage(20)}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Page 20
          </button>
        </div>
      </div>
    )
  },
}