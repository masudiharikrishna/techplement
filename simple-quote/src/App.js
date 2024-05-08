import React, { useEffect, useState } from 'react';
import './index.css';
import { TailSpin } from 'react-loader-spinner';

const App = () => {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://zenquotes.io/api/random'
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setQuote(data[0].q);
      } else {
        setQuote('No quote available');
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Error fetching quote');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchQuote = () => {
    fetchQuote();
  };

  return (
    <div className="homepage-container">
      <div>
        {loading ? (
          <div className='loading-container'>
            <TailSpin color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <p>{quote}</p>
        )}
      </div>
      <div className='button-container'>
        <button className="btn btn-primary" onClick={handleFetchQuote} disabled={loading}>
          Fetch Quote
        </button>
      </div>
    </div>
  );
};

export default App;
