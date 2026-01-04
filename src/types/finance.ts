export type Cycle = 'monthly' | 'yearly' | 'weekly' | 'daily' | 'one-time';

export type TransactionType = 'subscription' | 'income' | 'expense';

export interface BaseTransaction {
  id: string;
  name: string;
  amount: number;
  date: string; // ISO date string YYYY-MM-DD
  type: TransactionType;
}

export interface Subscription extends BaseTransaction {
  type: 'subscription';
  cycle: Cycle;
  isActive: boolean;
  category?: string;
}

export interface Income extends BaseTransaction {
  type: 'income';
  cycle: Cycle; // Can be recurring (salary) or one-time
  category?: string;
}

export interface Expense extends BaseTransaction {
  type: 'expense';
  cycle: 'one-time'; // Usually one-time, but could be recurring if modeled differently
  category?: string;
}

export type Transaction = Subscription | Income | Expense;
