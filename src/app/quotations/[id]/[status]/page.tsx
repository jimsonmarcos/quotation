import { updateQuotationStatus } from '@/actions/quotation'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; status: string }>
}) {
  const { id, status } = await params

  const response = await updateQuotationStatus(parseInt(id), status)
  console.log(response)

  redirect('/')
}
