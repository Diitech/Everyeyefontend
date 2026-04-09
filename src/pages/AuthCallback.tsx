import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveAuth } from '@/api/auth';

interface AuthCallbackProps {
  onLogin: (user: { name: string; email: string; avatar?: string }) => void;
}

export function AuthCallback({ onLogin }: AuthCallbackProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        saveAuth(token, user);
        onLogin(user);
        navigate('/', { replace: true });
      } catch {
        navigate('/', { replace: true });
      }
    } else {
      navigate('/', { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="pt-[72px] min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Signing you in...</p>
        <p className="text-gray-400 text-sm mt-2">You'll be redirected shortly</p>
      </div>
    </main>
  );
}