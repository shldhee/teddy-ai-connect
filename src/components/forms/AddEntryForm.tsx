import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import type { TransactionType, Cycle } from '../../types/finance';

interface AddEntryFormProps {
  onClose: () => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onClose }) => {
  const { addTransaction } = useFinance();
  const [type, setType] = useState<TransactionType>('subscription');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [cycle, setCycle] = useState<Cycle>('monthly');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    addTransaction({
      id: crypto.randomUUID(),
      type,
      name,
      amount: parseFloat(amount),
      date,
      ...(type === 'subscription' && { cycle, isActive: true }),
      ...(type === 'income' && { cycle }),
      ...(type === 'expense' && { cycle: 'one-time' }), // Default for expense
    } as any);

    onClose();
  };

  return (
    <div style={{
      width: '100%', maxWidth: '400px',
      background: 'hsl(var(--color-bg-card))',
      padding: 'var(--space-xl)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <h2 style={{ marginBottom: 'var(--space-md)' }}>Add Transaction</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-xs)', fontSize: 'var(--font-size-sm)' }}>Type</label>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            {(['subscription', 'income', 'expense'] as TransactionType[]).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                style={{
                  flex: 1,
                  padding: 'var(--space-sm)',
                  border: '1px solid currentColor',
                  borderRadius: 'var(--radius-sm)',
                  background: type === t ? 'hsl(var(--color-accent-primary))' : 'transparent',
                  color: type === t ? '#fff' : 'hsl(var(--color-text-secondary))',
                  cursor: 'pointer'
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-xs)', fontSize: 'var(--font-size-sm)' }}>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="e.g. Netflix, Salary..."
            style={{ width: '100%', padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid #333', background: '#000', color: '#fff' }}
          />
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: 'var(--space-xs)', fontSize: 'var(--font-size-sm)' }}>Amount</label>
           <input 
             type="number" 
             value={amount} 
             onChange={e => setAmount(e.target.value)} 
             placeholder="0.00"
             step="0.01"
             style={{ width: '100%', padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid #333', background: '#000', color: '#fff' }}
           />
        </div>

        {type !== 'expense' && (
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--space-xs)', fontSize: 'var(--font-size-sm)' }}>Cycle</label>
            <select 
              value={cycle} 
              onChange={e => setCycle(e.target.value as Cycle)}
              style={{ width: '100%', padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid #333', background: '#000', color: '#fff' }}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
              <option value="one-time">One-time</option>
            </select>
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: 'var(--space-xs)', fontSize: 'var(--font-size-sm)' }}>Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)}
            style={{ width: '100%', padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid #333', background: '#000', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-sm)' }}>
          <button 
            type="button" 
            onClick={onClose}
            style={{ flex: 1, padding: 'var(--space-md)', background: 'transparent', border: '1px solid #333', borderRadius: 'var(--radius-md)', color: '#fff', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button 
            type="submit"
            style={{ flex: 1, padding: 'var(--space-md)', background: 'hsl(var(--color-accent-primary))', border: 'none', borderRadius: 'var(--radius-md)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
