import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'


import App from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Test 1',
          type: 'deposit',
          category: 'Category 1',
          amount: 100,
          createdAt: new Date('2022-01-01 09:00:00')
        },
        {
          id: 2,
          title: 'Test 2',
          type: 'withdraw',
          category: 'Category 2',
          amount: 200,
          createdAt: new Date('2022-01-01 09:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      data.createdAt = new Date()

      return schema.create('transaction', data)
    })
  }
})



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

