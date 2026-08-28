import { useState } from 'react';
import { registerSeller, login } from '../lib/store';

export default function AuthScreen({ onAuthed }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [sellerName, setSellerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'register') {
        registerSeller({ sellerName, email, password });
      } else {
        login({ email, password });
      }
      onAuthed(email);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-card__eyebrow">TenderBoard for Sellers</div>
        <h1>{mode === 'register' ? 'Create your seller account' : 'Seller sign in'}</h1>

        {error && (
          <div className="banner banner--error" data-testid="auth-error-banner">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="field">
              <label htmlFor="sellerName">Seller / business name</label>
              <input
                id="sellerName"
                data-testid="seller-name-input"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              data-testid="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              data-testid="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" data-testid="auth-submit-button">
            {mode === 'register' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <div className="auth-switch">
          {mode === 'register' ? (
            <>
              Already have an account?
              <button
                type="button"
                data-testid="switch-to-login"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              New seller?
              <button
                type="button"
                data-testid="switch-to-register"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
