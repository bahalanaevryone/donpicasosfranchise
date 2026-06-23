import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import GlassCard from './GlassCard';
import { authLogin, authRegister } from '../lib/api';

type AuthMode = 'login' | 'register';

export type AuthFormValues = {
  fullName?: string;
  email: string;
  phone?: string;
  password: string;
};

interface AuthFormProps {
  mode: AuthMode;
  initialEmail?: string;
  initialFullName?: string;
  onSuccess: (result: { token: string; applicant: { id: string | number; fullName: string; email: string } }) => void;
  submitLabel?: string;
}

export default function AuthForm({
  mode,
  initialEmail,
  initialFullName,
  onSuccess,
  submitLabel,
}: AuthFormProps) {
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState<AuthFormValues>(() => ({
    fullName: initialFullName ?? '',
    email: initialEmail ?? '',
    phone: '',
    password: '',
  }));

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const queryString = searchParams.toString();
  const switchHref = `${mode === 'register' ? '/login' : '/register'}${queryString ? `?${queryString}` : ''}`;

  const title = useMemo(() => {
    return mode === 'register' ? 'Create Your Account' : 'Welcome Back';
  }, [mode]);

  const subtitle = useMemo(() => {
    return mode === 'register'
      ? 'Register to apply for an opportunity and get the next steps.'
      : 'Login to continue your opportunity application.';
  }, [mode]);

  const setField = (field: keyof AuthFormValues, v: string) => {
    setValues((cur) => ({ ...cur, [field]: v }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitStatus('submitting');

    if (values.password.length < 8) {
      setSubmitStatus('error');
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    try {
      if (mode === 'register') {
        await authRegister({
          fullName: values.fullName ?? '',
          email: values.email,
          phone: values.phone ?? '',
          password: values.password,
        });
      }

      // Login (whether fresh or after register)
      const result = await authLogin(values.email, values.password);
      setSubmitStatus('success');
      onSuccess({ token: result.token, applicant: result.applicant as any });
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err?.message ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <GlassCard className="p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-300">{subtitle}</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Full Name *</label>
              <Input
                placeholder="Juan Dela Cruz"
                value={values.fullName ?? ''}
                onChange={(e) => setField('fullName', e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Phone Number *</label>
              <Input
                placeholder="Your active mobile number"
                value={values.phone ?? ''}
                onChange={(e) => setField('phone', e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>
          )}

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Email *</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">Password *</label>
            <Input
              type="password"
              placeholder="Minimum 8 characters"
              value={values.password}
              onChange={(e) => setField('password', e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
            />
          </div>

          {submitStatus === 'error' && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            disabled={submitStatus === 'submitting'}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#B30000] text-black font-semibold text-lg py-6 hover:opacity-90"
          >
            {submitStatus === 'submitting' ? 'Please wait...' : submitLabel ?? (mode === 'register' ? 'Register' : 'Login')}
          </Button>
        </form>

        <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-gray-300">
          {mode === 'register' ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <Link to={switchHref} className="font-semibold text-[#FFD700] hover:text-white">
            {mode === 'register' ? 'Login here' : 'Create account'}
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
