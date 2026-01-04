import type { Transaction } from '../types/finance';

const STORAGE_KEY = 'teddy_finance_data';

export interface FinanceData {
  items: Transaction[];
}

export const loadData = (): FinanceData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to load data', error);
    return { items: [] };
  }
};

export const saveData = (data: FinanceData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data', error);
  }
};
