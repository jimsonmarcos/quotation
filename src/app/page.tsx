import QuotationsTable from '@/components/quotations-table'

export default async function Home() {
  return (
    <div className="grid grid-rows-[1] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <QuotationsTable />
    </div>
  )
}
