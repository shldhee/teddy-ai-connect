import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Transaction, Subscription, Income, Expense } from '../types/finance';
import { loadData, saveData } from '../services/storage';

interface FinanceContextType {
  transactions: Transaction[];
  subscriptions: Subscription[];
  incomes: Income[];
  expenses: Expense[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load data on mount
  useEffect(() => {
    const data = loadData();
    setTransactions(data.items);
  }, []);

  // Save data on change
  useEffect(() => {
    saveData({ items: transactions });
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (transaction: Transaction) => {
    setTransactions(prev => prev.map(t => (t.id === transaction.id ? transaction : t)));
  };

  const subscriptions = transactions.filter(t => t.type === 'subscription') as Subscription[];
  const incomes = transactions.filter(t => t.type === 'income') as Income[];
  const expenses = transactions.filter(t => t.type === 'expense') as Expense[];

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        subscriptions,
        incomes,
        expenses,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
