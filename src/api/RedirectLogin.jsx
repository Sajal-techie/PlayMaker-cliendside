// useRedirectToLogin.js
import { useNavigate } from 'react-router-dom';

export const useRedirectToLogin = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  return redirectToLogin;
};
