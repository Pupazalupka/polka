import { useNavigate } from 'react-router-dom';

function getCurrentUserName() {
  try {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}') as { name?: string };
    return user.name || 'Читатель';
  } catch {
    return 'Читатель';
  }
}

export function LibraryAccount() {
  const navigate = useNavigate();
  const name = getCurrentUserName();

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="library-account">
      <span className="library-account__avatar" aria-hidden="true">{name.charAt(0).toLocaleUpperCase()}</span>
      <span className="library-account__identity">
        <strong>{name}</strong>
        <small>Личный аккаунт</small>
      </span>
      <button className="library-account__logout" type="button" onClick={signOut} aria-label="Выйти из аккаунта" title="Выйти из аккаунта">↗</button>
    </div>
  );
}
