import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-[15px] right-[15px] z-50 p-2 rounded-full bg-light-100/10 hover:bg-light-100/20 text-light-200 hover:text-light-100 transition-colors duration-200"
      title="Logout"
      aria-label="Logout"
    >
      <LogOut className="h-5 w-5" />
    </button>
  );
}
