import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormField from '../elements/FormField';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Name is required.';
    if (!email.includes('@')) nextErrors.email = 'Enter a valid email.';
    if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    // UI-only: no registration logic implemented here.
    setTimeout(() => setIsSubmitting(false), 700);
  };

  return (
    <AuthLayout title="Create account">
      <form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />

        <FormField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          required
        />

        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-dark-100 rounded-lg font-semibold disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create account'}
          </button>
        </div>

        <p className="text-center text-sm text-light-200 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-light-100 font-medium">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
