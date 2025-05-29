'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '@/contexts/UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { fetchUserData } = useUser();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const decodedToken = jwtDecode(res.data.token) as { userId: string };
      await fetchUserData(decodedToken.userId);
      router.push('/home');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-white text-2xl mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">
          Sign In
        </button>

        <div className='flex justify-center mt-4'>
          <p className="text-white text-sm mb-4">Don't have an account? <Link href="/auth/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}