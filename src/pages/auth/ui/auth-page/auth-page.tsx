import { Link, useNavigate } from 'react-router-dom';

import { LoginByEmailSection } from '@/widgets/auth/login-by-email-section';

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <main>
      <LoginByEmailSection onSuccess={() => navigate('/')} />
      <Link to="/auth/register">회원가입</Link>
    </main>
  );
}
