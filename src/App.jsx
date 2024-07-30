import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import QuoteDisplay from './components/QuoteDisplay';
import AuthModal from './components/AuthModal';
import axios from 'axios';
import './App.css';

const App = () => {
  const [magicQuote, setMagicQuote] = useState({});
  const [userQuotes, setUserQuotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(null); 

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('https://type.fit/api/quotes');
        const quotes = response.data;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setMagicQuote(randomQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };
    fetchQuotes();
  }, []);

  const handleGenerateQuote = () => {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setMagicQuote(randomQuote);
  };

  const handleSignIn = (email, password, setError) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setUserQuotes(JSON.parse(localStorage.getItem('userQuotes')) || []);
      setShowModal(null); 
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSignUp = (name, email, password, confirmPassword, setError) => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.find((u) => u.email === email)) {
      setError('Email already in use');
      return;
    }
    const newUser = { name, email, password };
    localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
    setCurrentUser(newUser);
    setUserQuotes([]);
    setShowModal(null); 
  };

  const handleSignOut = () => {
    setCurrentUser(null); 
    setUserQuotes([]); 
    setSearchQuery(''); 
    localStorage.removeItem('userQuotes'); 
  };

  const handleAddUserQuote = (quoteText, author) => {
    if (!currentUser && author !== currentUser.name) {
      alert('Please sign in or sign up');
      return;
    }
    const newQuote = { text: quoteText, author }; 
    const updatedQuotes = [...userQuotes, newQuote];
    setUserQuotes(updatedQuotes);
    localStorage.setItem('userQuotes', JSON.stringify(updatedQuotes));
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <Navbar
        currentUser={currentUser}
        onSignIn={() => setShowModal('signIn')}
        onSignUp={() => setShowModal('signUp')}
        onSignOut={handleSignOut}
      />
      {showModal && (
        <AuthModal
          type={showModal}
          onClose={() => setShowModal(null)}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
        />
      )}
      <QuoteDisplay
        magicQuote={magicQuote}
        userQuotes={userQuotes}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAddUserQuote={handleAddUserQuote} 
        currentUser={currentUser} 
      />
      <button className='end-Btn' onClick={handleGenerateQuote}>Generate New Quote</button>
    </div>
  );
};

export default App;
