import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import SectionList from '../lists/SectionList';
import SummaryWidget from './SummaryWidget';
import AddEntryForm from '../forms/AddEntryForm';

const Dashboard: React.FC = () => {
  const { subscriptions, expenses } = useFinance();
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter forgotten subscriptions (e.g., inactive but present? Or simply a separate list logic?)
  // For now, let's list Inactive Subscriptions as "Forgotten" candidates or similar.
  const activeSubs = subscriptions.filter(s => s.isActive);
  const inactiveSubs = subscriptions.filter(s => !s.isActive);

  return (
    <div className="dashboard">
      <SummaryWidget subscriptions={subscriptions} />

      <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
        <SectionList 
            title="Active Subscriptions" 
            items={activeSubs} 
            emptyMessage="No active subscriptions"
        />
        
        <SectionList 
            title="Monthly Expenses" 
            items={expenses} // Maybe filter by month?
            emptyMessage="No expenses recorded"
        />

        {inactiveSubs.length > 0 && (
            <SectionList 
                title="Inactive / Forgotten?" 
                items={inactiveSubs} 
                emptyMessage=""
            />
        )}
      </div>

      {/* Floating Action Button for Add */}
      <button 
        onClick={() => setShowAddForm(true)}
        style={{
          position: 'fixed',
          bottom: 'var(--space-xl)',
          right: 'var(--space-xl)',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'hsl(var(--color-accent-primary))',
          color: 'white',
          border: 'none',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        +
      </button>

      {showAddForm && (
        <div style={{ 
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 
        }}>
           <AddEntryForm onClose={() => setShowAddForm(false)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
