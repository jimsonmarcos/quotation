import { updateQuotationStatus } from '@/actions/quotation'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; status: string }>
}) {
  const { id, status } = await params

  await updateQuotationStatus(parseInt(id), status)

  redirect('/')
}
