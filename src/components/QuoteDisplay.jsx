import React, { useState } from 'react';
import './QuoteDisplay.css';

const QuoteDisplay = ({ magicQuote, userQuotes, searchQuery, onSearchChange, onAddUserQuote, currentUser }) => {
  const [userQuote, setUserQuote] = useState('');
  const [error, setError] = useState('');

  const handleAddUserQuote = (quoteText, author) => {
    setError('');
    if (!quoteText.trim()) {
      setError('Please enter a quote.');
      return;
    }
    onAddUserQuote(quoteText, author);
    setUserQuote('');
  };

  const handleSaveMagicQuote = () => {
    if (!currentUser) {
      alert('Please sign in or sign up');
      return;
    }
    const quoteText = magicQuote.text;
    const quoteAuthor = (magicQuote.author || 'Unknown').split(',')[0].trim(); 

    if (!quoteText) {
      alert('No magic quote available to save');
      return;
    }
    handleAddUserQuote(quoteText, quoteAuthor); 
  };

  const handleSearch = () => {
    setError('');
    if (searchQuery.trim() === '') {
      setError('Please enter a search term.');
      return;
    }
    console.log('Perform search for:', searchQuery);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      if (action === 'search') {
        handleSearch();
      } else if (action === 'addQuote') {
        handleAddUserQuote(userQuote, currentUser?.name || 'Anonymous'); 
      }
    }
  };

  return (
    <div className="quote-display">
      <div className="magic-quote">
        <h2>Magic Quote</h2>
        <p>{magicQuote.text}</p>
        <footer>— {(magicQuote.author || 'Unknown').split(',')[0].trim()}</footer>
        <button className='Btn' onClick={handleSaveMagicQuote}>Save This Quote</button>
      </div>
      <div className="user-quotes">
        <h2>Your Quotes</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search your quotes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'search')}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="add-quote">
          <input
            type="text"
            placeholder="Write your own quote..."
            value={userQuote}
            onChange={(e) => setUserQuote(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'addQuote')}
          />
          <button onClick={() => handleAddUserQuote(userQuote, currentUser?.name || 'Anonymous')}>Save Quote</button> {/* Use user's name or default */}
        </div>
        <ul>
          {userQuotes
            .filter((quote) =>
              quote.text.toLowerCase().includes(searchQuery.trim().toLowerCase())
            )
            .map((quote, index) => (
              <li key={index}>
                {quote.text} — {(quote.author || 'Unknown').split(',')[0].trim()}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default QuoteDisplay;
