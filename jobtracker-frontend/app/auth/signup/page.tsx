'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setError('');
    
    if (!email || !name || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://jobtracker-production.up.railway.app/api/auth/signup', { email, name, password });
      if (response.status === 201 || response.status === 200) {
        router.push('/auth/login');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Signup error:', err.response?.data);
        if (err.response) {
          if (err.response.status === 400 && err.response.data.message === 'User already exists') {
            setError('This email is already registered. Please use a different email or try logging in.');
          } else {
            const errorMessage = err.response.data.message || err.response.data.error || 'Error creating account';
            setError(errorMessage);
          }
        } else if (err.request) {
          setError('No response from server. Please try again later.');
        } else {
          setError('Error creating account. Please check your connection.');
        }
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-white text-2xl mb-6">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 text-black p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 text-black p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 text-black p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button 
          onClick={handleSignup} 
          className={`w-full ${isLoading ? 'bg-gray-600' : 'bg-green-600'} text-white py-2 rounded`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </div>
  );
}