import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import FormField from '../elements/FormField';

type SignInFormValues = {
  emailOrName: string;
  password: string;
};

export default function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormValues>({
    defaultValues: {
      emailOrName: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    const result = await signIn(values);

    if (!result.ok) {
      setError('root', { message: result.message ?? 'Invalid credentials.' });
      return;
    }

    navigate('/');
  };

  return (
    <AuthLayout title="Sign In">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Email or Name"
          placeholder="you@example.com or your name"
          {...register('emailOrName', {
            required: 'Email or name is required.',
            minLength: {
              value: 2,
              message: 'Email or name is too short.',
            },
          })}
          error={errors.emailOrName?.message}
        />

        <FormField
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register('password', {
            required: 'Password is required.',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters.',
            },
          })}
          error={errors.password?.message}
        />

        {errors.root && <p className="text-sm text-red-400 mb-3">{errors.root.message}</p>}

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
