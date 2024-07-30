import React from 'react';
import './Navbar.css';

const Navbar = ({ currentUser, onSignIn, onSignUp, onSignOut }) => {
  return (
    <nav className="navbar">
      <h1>Magic Quote Generator</h1>
      <div className="nav-buttons">
        {currentUser ? (
          <>
            <span>Welcome, {currentUser.name}</span>
            <button onClick={onSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={onSignIn}>Sign In</button>
            <button onClick={onSignUp}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
