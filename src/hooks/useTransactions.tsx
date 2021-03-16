import { useState, useEffect, useContext, createContext, useMemo, ReactNode } from 'react'

import api from '../services/api'

export interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: Date
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface Summary {
  deposits: number
  withdraws: number
  total: number
}

interface TransactionsContextData {
  transactions: Transaction[]
  summary: Summary
  addTransaction: (data: TransactionInput) => void
}

interface TransactionsProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function fetchTransactions() {
      const response = await api.get('/transactions')
      setTransactions(response.data.transactions)
    }

    fetchTransactions()
  }, [])

  async function addTransaction(newTransaction: TransactionInput): Promise<void> {
    const response = await api.post('/transactions', newTransaction)
    setTransactions(oldTransactions => [...oldTransactions, response.data.transaction])
  }

  const summary = useMemo(() => {
    return transactions.reduce((summary, t) : Summary => {
      switch (t.type) {
        case 'deposit':
          summary.deposits += t.amount
          summary.total += t.amount
          break;
        case 'withdraw':
          summary.withdraws += t.amount
          summary.total -= t.amount
          break;
      }

      return summary

    }, {
      deposits: 0,
      withdraws: 0,
      total: 0
    })
  }, [transactions])

  return (
    <TransactionsContext.Provider value={{ transactions, summary, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions(): TransactionsContextData {
  return useContext(TransactionsContext)
}
