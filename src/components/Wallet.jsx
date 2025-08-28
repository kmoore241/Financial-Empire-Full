
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button } from './ui';
import useLocalStorage from './support/useLocalStorage';

export default function Wallet() {
  const [balance, setBalance] = useLocalStorage('walletBalance', 10000);
  const [transactions, setTransactions] = useLocalStorage('walletTransactions', []);
  const [amount, setAmount] = useState('');

  const deposit = () => {
    const amt = parseFloat(amount);
    if (!isNaN(amt) && amt > 0) {
      const newBalance = balance + amt;
      setBalance(newBalance);
      setTransactions([...transactions, { type: 'Deposit', amount: amt, date: new Date().toISOString() }]);
      setAmount('');
    }
  };

  const withdraw = () => {
    const amt = parseFloat(amount);
    if (!isNaN(amt) && amt > 0 && amt <= balance) {
      const newBalance = balance - amt;
      setBalance(newBalance);
      setTransactions([...transactions, { type: 'Withdraw', amount: amt, date: new Date().toISOString() }]);
      setAmount('');
    }
  };

  return (
    <Card>
      <CardHeader>Wallet</CardHeader>
      <CardBody>
        <p className="mb-2">Balance: ${balance.toFixed(2)}</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border p-2 rounded w-full mb-2"
        />
        <div className="flex gap-2">
          <Button onClick={deposit}>Deposit</Button>
          <Button onClick={withdraw} variant="secondary">Withdraw</Button>
        </div>
        <h3 className="mt-4 font-bold">Transactions</h3>
        <ul className="mt-2">
          {transactions.map((t, idx) => (
            <li key={idx} className="border-b py-1 text-sm">
              {t.date.split('T')[0]} - {t.type}: ${t.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
