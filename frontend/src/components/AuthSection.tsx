import React, { useState, useEffect } from 'react';
import { Wallet, LogIn, UserPlus, Coins } from 'lucide-react';
import { authAPI, walletAPI } from '../services/api';
import toast from 'react-hot-toast';

interface AuthSectionProps {
  user: any;
  setUser: (user: any) => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [walletCreating, setWalletCreating] = useState(false);

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('authToken');
    if (token && !user) {
      loadUserProfile();
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('authToken');
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = isLogin 
        ? await authAPI.login(email, password)
        : await authAPI.register(email, password);
      
      localStorage.setItem('authToken', response.data.token);
      setUser(response.data.user);
      toast.success(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
      
      // Clear form
      setEmail('');
      setPassword('');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const createCDPWallet = async () => {
    setWalletCreating(true);
    try {
      const response = await walletAPI.create();
      setUser({ ...user, walletId: response.data.walletId });
      toast.success('CDP Wallet created successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create wallet');
    } finally {
      setWalletCreating(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    toast.success('Logged out successfully');
  };

  if (user) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Account</h3>
          <button
            onClick={logout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <LogIn className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
          
          {user.walletId ? (
            <div className="flex items-center space-x-2">
              <Wallet className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                Wallet: {user.walletId.slice(0, 8)}...
              </span>
            </div>
          ) : (
            <button
              onClick={createCDPWallet}
              disabled={walletCreating}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Coins className="h-4 w-4" />
              <span>{walletCreating ? 'Creating...' : 'Create CDP Wallet'}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 rounded-lg ${
            isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 rounded-lg ${
            !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
          <span>{loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}</span>
        </button>
      </form>
    </div>
  );
};

export default AuthSection;