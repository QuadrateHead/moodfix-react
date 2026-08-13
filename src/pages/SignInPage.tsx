import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormField from '../elements/FormField';

export default function SignInPage() {
  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    // UI-only: no authentication logic implemented here.
    setTimeout(() => {
      setIsSubmitting(false);
      setError('Authentication not implemented in UI-only mode.');
    }, 700);
  };

  return (
    <AuthLayout title="Sign In">
      <form onSubmit={handleSubmit}>
        <FormField
          label="Email or Name"
          name="emailOrName"
          placeholder="you@example.com or your name"
          value={emailOrName}
          onChange={(e) => setEmailOrName(e.target.value)}
          required
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-dark-100 rounded-lg font-semibold disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <p className="text-center text-sm text-light-200 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-light-100 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
