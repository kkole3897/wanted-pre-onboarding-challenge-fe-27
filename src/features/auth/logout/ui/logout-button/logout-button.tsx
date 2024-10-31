import { useNavigate } from 'react-router-dom';

import { useVisitorStore } from '@/entities/visitor';

export default function LogoutButton() {
  const clearAccessToken = useVisitorStore((state) => state.clearAccessToken);
  const navigate = useNavigate();

  const handleClick = () => {
    clearAccessToken();
    navigate('/auth');
  };

  return (
    <button type="button" onClick={handleClick}>
      로그아웃
    </button>
  );
}
