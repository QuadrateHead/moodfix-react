import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import FormField from '../elements/FormField';

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    const result = await signUp({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (!result.ok) {
      setError('root', { message: result.message ?? 'Unable to create account.' });
      return;
    }

    navigate('/');
  };

  return (
    <AuthLayout title="Create account">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Name"
          placeholder="Your name"
          {...register('name', { required: 'Name is required.' })}
          error={errors.name?.message}
        />

        <FormField
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address.',
            },
          })}
          error={errors.email?.message}
        />

        <FormField
          label="Password"
          type="password"
          placeholder="Create a password"
          {...register('password', {
            required: 'Password is required.',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters.',
            },
          })}
          error={errors.password?.message}
        />

        <FormField
          label="Confirm password"
          type="password"
          placeholder="Repeat your password"
          {...register('confirmPassword', {
            required: 'Please confirm your password.',
            validate: (value, formValues) =>
              value === formValues.password || 'Passwords do not match.',
          })}
          error={errors.confirmPassword?.message}
        />

        {errors.root && <p className="text-sm text-red-400 mb-3">{errors.root.message}</p>}

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
