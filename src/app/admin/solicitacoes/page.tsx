import type { Metadata } from 'next'
import { AdoptionRequestsList } from '@/components/admin/AdoptionRequestsList'
import { fetchAdoptionRequests } from '@/app/actions/admin-adoption-requests'

export const metadata: Metadata = {
  title: 'Solicitações de adoção – Admin – OBA Floripa',
  description: 'Listagem e gestão das solicitações de adoção.',
}

export default async function SolicitacoesPage() {
  const result = await fetchAdoptionRequests()
  const initialRequests = result.success ? result.data : []

  if (!result.success) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
        <p className="font-medium">Erro ao carregar solicitações</p>
        <p className="mt-1 text-sm">{result.error}</p>
      </div>
    )
  }

  return <AdoptionRequestsList initialRequests={initialRequests} />
}
