import { useNavigate, Link } from 'react-router-dom';

import { RegisterByEmailSection } from '@/widgets/auth/register-by-email-section';

export default function AuthRegistrationPage() {
  const navigate = useNavigate();

  return (
    <main>
      <Link to="/auth">돌아가기</Link>
      <RegisterByEmailSection onSuccess={() => navigate('/')} />
    </main>
  );
}
