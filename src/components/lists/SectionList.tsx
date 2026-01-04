import React from 'react';
import type { Transaction } from '../../types/finance';
import Card from '../common/Card';

interface SectionListProps {
  title: string;
  items: Transaction[];
  emptyMessage?: string;
  onItemClick?: (item: Transaction) => void;
}

const SectionList: React.FC<SectionListProps> = ({ title, items, emptyMessage = "No items found", onItemClick }) => {
  return (
    <Card title={title}>
      {items.length === 0 ? (
        <p style={{ color: 'hsl(var(--color-text-muted))', textAlign: 'center', padding: 'var(--space-md) 0' }}>
          {emptyMessage}
        </p>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          {items.map(item => (
            <li 
              key={item.id}
              onClick={() => onItemClick && onItemClick(item)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-md)',
                background: 'hsl(var(--color-bg-hover))',
                borderRadius: 'var(--radius-md)',
                cursor: onItemClick ? 'pointer' : 'default',
                transition: 'var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                 <div style={{
                   width: '40px',
                   height: '40px',
                   borderRadius: '50%',
                   background: item.type === 'subscription' ? 'hsl(var(--color-accent-primary))' : 
                               item.type === 'income' ? 'hsl(var(--color-success))' : 'hsl(var(--color-warning))',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   color: '#fff',
                   fontWeight: 'bold',
                   fontSize: '1.2rem'
                 }}>
                   {item.name.charAt(0).toUpperCase()}
                 </div>
                 <div>
                   <div style={{ fontWeight: 500 }}>{item.name}</div>
                   {item.type === 'subscription' && (
                      <div style={{ fontSize: 'var(--font-size-sm)', color: 'hsl(var(--color-text-muted))' }}>
                        {(item as any).cycle}
                      </div>
                   )}
                 </div>
              </div>
              <div style={{ fontWeight: 600 }}>
                {item.type === 'expense' || item.type === 'subscription' ? '-' : '+'}
                ${item.amount.toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default SectionList;
