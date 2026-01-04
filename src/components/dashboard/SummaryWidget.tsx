import React from 'react';
import Card from '../common/Card';
import type { Subscription } from '../../types/finance';

interface SummaryWidgetProps {
  subscriptions: Subscription[];
}

const SummaryWidget: React.FC<SummaryWidgetProps> = ({ subscriptions }) => {
  const activeSubs = subscriptions.filter(s => s.isActive);
  
  // Simple calculation assuming all are monthly for now. 
  // TODO: Handle yearly/weekly logic if needed.
  const totalMonthly = activeSubs.reduce((acc, sub) => {
    if (sub.cycle === 'monthly') return acc + sub.amount;
    if (sub.cycle === 'yearly') return acc + (sub.amount / 12);
    return acc;
  }, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
      <Card>
        <div style={{ color: 'hsl(var(--color-text-secondary))', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-xs)' }}>
          Monthly Fixed
        </div>
        <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold' }}>
          ${totalMonthly.toFixed(2)}
        </div>
      </Card>

      <Card>
        <div style={{ color: 'hsl(var(--color-text-secondary))', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-xs)' }}>
          Active Subscriptions
        </div>
        <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold' }}>
          {activeSubs.length}
        </div>
      </Card>
    </div>
  );
};

export default SummaryWidget;
