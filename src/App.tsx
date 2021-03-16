import { useState } from 'react';
import Modal from 'react-modal'

import Provider from './hooks';

import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import NewTransactionModal from './components/NewTransactionModal';

import GlobalStyle from "./styles/global";

Modal.setAppElement('#root')

function App() {
  const [isNewTransactionModalOpen, setNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setNewTransactionModalOpen(false)
  }

  return (
    <Provider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />

      <GlobalStyle />
    </Provider>
  );
}

export default App;
