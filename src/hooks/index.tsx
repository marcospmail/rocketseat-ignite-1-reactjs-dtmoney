import { ReactNode } from "react";

import { TransactionsProvider } from "./useTransactions";

interface ProviderProps {
  children: ReactNode
}

function Provider({ children }: ProviderProps) {
  return (
    <TransactionsProvider>
      {children}
    </TransactionsProvider>
  )
}

export default Provider
