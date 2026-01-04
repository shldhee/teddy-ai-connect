import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      {/* 
        Ideally we would have a Sidebar here or a TopBar. 
        For now, let's make it a centered max-width container 
        to focus on the "Single Page" experience.
      */}
      <header style={{ padding: 'var(--space-xl) var(--space-md)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '800' }}>Teddy Finance</h1>
        <p style={{ color: 'hsl(var(--color-text-secondary))', marginTop: 'var(--space-sm)' }}>
          Manage your subscriptions and cash flow
        </p>
      </header>
      
      <main style={{ 
        flex: 1, 
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 var(--space-md) var(--space-2xl)' 
      }}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
