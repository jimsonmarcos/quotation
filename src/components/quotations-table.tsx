'use client'

import { createQuotation, getAllQuotations } from '@/actions/quotation'
import { useEffect, useState } from 'react'

type Quotation = {
  id: number
  salesperson: string
  content: string
  status: string | null
  createdAt: Date
}

export default function QuotationsTable() {
  const [quotations, setQuotations] = useState<Quotation[]>([])

  useEffect(() => {
    getAllQuotations().then((data) => {
      setQuotations(data)
    })
  }, [])

  const handleAddQuotation = async () => {
    const newQuotation = await createQuotation()
    setQuotations((prev) => [...prev, newQuotation])
  }

  console.log(quotations)

  return (
    <>
      <div className="flex justify-between items-center mb-4 gap-x-4">
        <h2 className="text-lg font-semibold">Quotations</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer"
          onClick={handleAddQuotation}
        >
          Add New Quotation
        </button>
      </div>
      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Quotation
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quotation) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={quotation.id}
              >
                <td className="px-6 py-4">{quotation.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {quotation.content}
                </td>
                <td className="px-6 py-4">{quotation.salesperson}</td>
                <td className="px-6 py-4">{quotation.createdAt.toLocaleString()}</td>
                <td className="px-6 py-4">{quotation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
