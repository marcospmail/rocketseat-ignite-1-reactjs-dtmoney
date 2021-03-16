import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions'

import { Container, TransactionTypeContainer, RadioBox } from './styles'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  const { addTransaction } = useTransactions()

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    const data = {
      title,
      amount,
      category,
      type
    }

    addTransaction(data)
    onRequestClose()
  }

  return <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
  >
    <Container onSubmit={handleCreateNewTransaction}>
      <button type="button" className="react-modal-close-btn" onClick={onRequestClose}>
        <img src={closeImg} alt="Fechar" />
      </button>

      <h2>Cadastrar transações</h2>

      <input
        placeholder="Título"
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Valor"
        onChange={e => setAmount(Number(e.target.value))}
      />

      <TransactionTypeContainer >

        <RadioBox
          type="button"
          onClick={() => setType('deposit')}
          isActive={type === 'deposit'}
          activeColor="green"
        >
          <img src={incomeImg} alt="Entrada" />
          <span >Entrada</span>
        </RadioBox>

        <RadioBox
          type="button"
          onClick={() => setType('withdraw')}
          isActive={type === 'withdraw'}
          activeColor="red"
        >
          <img src={outcomeImg} alt="Saída" />
          <span >Saída</span>
        </RadioBox>

      </TransactionTypeContainer>

      <input
        placeholder="Categoria"
        onChange={e => setCategory(e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </Container>
  </Modal>
}

export default NewTransactionModal