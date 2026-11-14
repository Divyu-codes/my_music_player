import { useState } from 'react';
import api from '../utils/axios';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        // Register API call
        await api.post('/auth/register/', { username, password });
        alert('Registration successful! Please login.');
        setIsRegistering(false);
      } else {
        // Login API call
        const response = await api.post('/auth/login/', { username, password });
        
        // Token ko localStorage mein save karna
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        // Parent component (App.jsx) ko batana ki login ho gaya
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.detail || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-green-500 transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-green-500 transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-md transition-colors mt-4"
          >
            {isRegistering ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="text-zinc-400 text-center mt-6 text-sm">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="text-green-500 hover:underline ml-1 font-semibold"
          >
            {isRegistering ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
} 