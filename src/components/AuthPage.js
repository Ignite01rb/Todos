import React, { useState } from 'react';

export default function AuthPage({ initialMode = 'login', onLoginSuccess, onBackToLanding }) {
  const [mode, setMode] = useState(initialMode);
  
  // Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  // Error state
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Common validations
    if (!email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Retrieve database from localStorage
    const users = JSON.parse(localStorage.getItem('taskify_users') || '[]');

    if (mode === 'login') {
      // Login Process
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        setError('No account found with this email.');
        return;
      }
      if (user.password !== password) {
        setError('Incorrect password. Please try again.');
        return;
      }

      // Success
      onLoginSuccess(user);
    } else {
      // Register Process
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!name.trim()) {
        setError('Please enter your name.');
        return;
      }

      // Check if user already exists
      const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setError('An account with this email already exists.');
        return;
      }

      // Register new user
      const newUser = {
        id: Date.now().toString(),
        email: email.trim(),
        password,
        name: name.trim()
      };

      users.push(newUser);
      localStorage.setItem('taskify_users', JSON.stringify(users));

      // Success
      onLoginSuccess(newUser);
    }
  };

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card glass-panel">
        
        {/* Back Link */}
        <button className="auth-back-btn" onClick={onBackToLanding}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </button>

        {/* Brand Header */}
        <div className="auth-brand">
          <div className="brand-logo">
            <svg className="logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2>Taskify</h2>
          <p>{mode === 'login' ? 'Sign in to access your dashboard' : 'Create an account to get started'}</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="auth-error-banner animate-scale-in">
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="auth-field-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-field-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {mode === 'register' && (
            <div className="auth-field-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary auth-submit-btn">
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Mode Toggle */}
        <div className="auth-toggle-link">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={handleToggleMode}>Sign Up</button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={handleToggleMode}>Sign In</button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
