import React, { useState } from 'react';
import PaginationDemo from './components/PaginationDemo';
import DebounceSearchDemo from './components/DebounceSearchDemo';

type DemoType = 'pagination' | 'debounce';

function App() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('pagination');

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <header style={{ 
        backgroundColor: '#fff', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '20px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ 
            margin: '0 0 20px 0', 
            color: '#333',
            textAlign: 'center'
          }}>
            React Custom Hooks Lab
          </h1>
          
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
              onClick={() => setActiveDemo('pagination')}
              style={{
                padding: '10px 20px',
                backgroundColor: activeDemo === 'pagination' ? '#007bff' : '#f8f9fa',
                color: activeDemo === 'pagination' ? 'white' : '#007bff',
                border: '2px solid #007bff',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              usePagination Hook
            </button>
            
            <button
              onClick={() => setActiveDemo('debounce')}
              style={{
                padding: '10px 20px',
                backgroundColor: activeDemo === 'debounce' ? '#28a745' : '#f8f9fa',
                color: activeDemo === 'debounce' ? 'white' : '#28a745',
                border: '2px solid #28a745',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              useDebounce Hook
            </button>
          </nav>
        </div>
      </header>

      <main style={{ padding: '40px 20px' }}>
        {activeDemo === 'pagination' && <PaginationDemo />}
        {activeDemo === 'debounce' && <DebounceSearchDemo />}
      </main>

      <footer style={{ 
        backgroundColor: '#fff', 
        borderTop: '1px solid #dee2e6',
        padding: '20px',
        textAlign: 'center',
        color: '#6c757d'
      }}>
        <p>Custom React Hooks Lab - usePagination & useDebounce</p>
        <p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>
          Demonstrating reusable hook patterns for pagination and debouncing
        </p>
      </footer>
    </div>
  );
}

export default App;
