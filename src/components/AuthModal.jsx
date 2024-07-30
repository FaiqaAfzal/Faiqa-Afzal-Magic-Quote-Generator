import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ type, onClose, onSignIn, onSignUp }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (type === 'signIn') {
      if (!formData.email || !formData.password) {
        setError('Email and password are required.');
        return;
      }
      onSignIn(formData.email, formData.password, setError);
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('All fields are required.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      onSignUp(formData.name, formData.email, formData.password, formData.confirmPassword, setError);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{type === 'signIn' ? 'Sign In' : 'Sign Up'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {type === 'signUp' && (
            <>
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={formData.name}
                onChange={handleChange} 
                required 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange} 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange} 
                required 
              />
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                value={formData.confirmPassword}
                onChange={handleChange} 
                required 
              />
            </>
          )}
          {type === 'signIn' && (
            <>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange} 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange} 
                required 
              />
            </>
          )}
          <button type="submit">{type === 'signIn' ? 'Sign In' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
 