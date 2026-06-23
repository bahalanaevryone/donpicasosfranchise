import { useNavigate, useSearchParams } from 'react-router';
import { Link } from 'react-router';
import AuthForm from '../components/AuthForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get('mode');
  const packageCode = searchParams.get('package');

  return (
    <div className="min-h-screen bg-[#7A0000]">
      <Navbar />

      <main className="pt-28 pb-16">
        {/* Branded header */}
        <div className="text-center mb-10 px-4">
          <img
            src="/assets/don-picasos-logo.jpg"
            alt="Don Picaso's"
            className="mx-auto mb-6 h-16 w-auto max-w-xs rounded-lg object-contain shadow-[0_0_24px_rgba(255,215,0,0.25)]"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Create Your{' '}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#B30000] bg-clip-text text-transparent">
              Account
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Join Don Picaso's House of Franchise today.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Already have an account?{' '}
            <Link
              to={`/login${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}
              className="text-[#FFD700] hover:text-white font-semibold"
            >
              Log in here
            </Link>
          </p>
        </div>

        <div className="px-4">
          <AuthForm
            mode="register"
            initialEmail=""
            initialFullName=""
            submitLabel="Create Account"
            onSuccess={(result) => {
              localStorage.setItem('dp_app_token', result.token);
              localStorage.setItem('dp_applicant_email', result.applicant.email);
              localStorage.setItem('dp_applicant_fullName', result.applicant.fullName);

              if (mode === 'opportunity' && packageCode) {
                navigate(`/apply?package=${encodeURIComponent(packageCode)}`, { replace: true });
              } else {
                navigate('/portal', { replace: true });
              }
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
