import { format } from 'date-fns'
import { useTransactions } from '../../hooks/useTransactions'

import { formatToBRLCurrency } from '../../utils/format'

import { Container } from "./styles"

function TransactionsTable() {
  const { transactions } = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td className={t.type}>
                {formatToBRLCurrency(t.amount)}
              </td>
              <td>{t.category}</td>
              <td>{format(new Date(t.createdAt), "dd/MM/yyyy")}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </Container>
  )
}

export default TransactionsTable