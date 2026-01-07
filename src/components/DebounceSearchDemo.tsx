import React, { useState, useEffect } from 'react';
import { useDebounceValue } from '../hooks/useDebounce';

const DebounceSearchDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [delay, setDelay] = useState(500);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  
  const debouncedSearchTerm = useDebounceValue(searchTerm, delay);

  // Sample data to search through
  const sampleData = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape',
    'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Orange', 'Papaya',
    'Quince', 'Raspberry', 'Strawberry', 'Tangerine', 'Ugli fruit', 'Vanilla',
    'Watermelon', 'Xigua', 'Yellow passion fruit', 'Zucchini',
    'Apricot', 'Blueberry', 'Cantaloupe', 'Dragonfruit', 'Eggplant'
  ];

  // Simulate API call or search when debounced value changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log(`Searching for: ${debouncedSearchTerm}`);
      
      // Simulate search results
      const results = sampleData.filter(item =>
        item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.target.value));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Debounce Search Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="delay">Debounce Delay (ms): </label>
        <input
          id="delay"
          type="number"
          value={delay}
          onChange={handleDelayChange}
          min="0"
          max="2000"
          step="100"
          style={{ 
            marginLeft: '10px', 
            padding: '5px', 
            width: '80px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Type to search..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div>
          <h4>Current Input:</h4>
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            minHeight: '24px',
            fontFamily: 'monospace'
          }}>
            {searchTerm || <em style={{ color: '#6c757d' }}>Empty</em>}
          </div>
        </div>
        
        <div>
          <h4>Debounced Value (after {delay}ms):</h4>
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e7f3ff', 
            border: '1px solid #b3d9ff',
            borderRadius: '4px',
            minHeight: '24px',
            fontFamily: 'monospace'
          }}>
            {debouncedSearchTerm || <em style={{ color: '#6c757d' }}>Empty</em>}
          </div>
        </div>
      </div>

      <div>
        <h4>Simulated Search Results:</h4>
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '15px',
          backgroundColor: '#fff',
          minHeight: '100px'
        }}>
          {searchResults.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}
                >
                  {result}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: '#6c757d', 
              fontStyle: 'italic',
              paddingTop: '30px'
            }}>
              {debouncedSearchTerm ? 'No results found.' : 'Type to see results.'}
            </div>
          )}
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        fontSize: '14px',
        color: '#495057'
      }}>
        <strong>How it works:</strong> The search only triggers after you stop typing for {delay}ms. 
        This prevents excessive API calls while typing rapidly. Try changing the delay to see the difference!
      </div>
    </div>
  );
};

export default DebounceSearchDemo;
