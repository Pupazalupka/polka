import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './LibraryLayout.scss';

interface LibraryLayoutProps {
  children: ReactNode;
}

const readingLinks = [
  { label: 'Сейчас читаю', to: '/library?status=reading-now' },
  { label: 'Прочитано', to: '/library?status=read' },
  { label: 'Хочу прочитать', to: '/library?status=want-read' },
  { label: 'Заброшенное', to: '/library?status=abandoned' },
];

function currentUserName() {
  try {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}') as { name?: string };
    return user.name || 'Читатель';
  } catch {
    return 'Читатель';
  }
}

export function LibraryLayout({ children }: LibraryLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const name = currentUserName();
  const params = new URLSearchParams(location.search);
  const currentStatus = params.get('status');
  const isLibraryRoute = location.pathname === '/library' || location.pathname.startsWith('/books/');
  const isQuoteRoute = location.pathname === '/quote-library';
  const isCatalogRoute = location.pathname === '/all-books';
  const isFavoriteRoute = params.get('favorite') === 'true';
  const allBooksActive = isCatalogRoute || (isLibraryRoute && !currentStatus && !isFavoriteRoute);
  const showMobileAddBook = location.pathname === '/library';

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="library-shell">
      <aside className="library-sidebar">
        <Link className="library-brand" to="/" aria-label="Полка — моя библиотека">
          <Icon type="polka-bordo" styleWidth="24px" classNameIcon="library-brand__icon" />
          <span>Полка</span>
        </Link>

        <nav className="library-nav" aria-label="Основная навигация">
          <div className="library-nav__group">
            <p className="library-nav__heading">Моя библиотека</p>
            {readingLinks.map((link) => {
              const status = new URLSearchParams(link.to.split('?')[1]).get('status');
              const selected = isLibraryRoute && currentStatus === status;
              return <Link key={link.to} className={`library-nav__link ${selected ? 'is-active' : ''}`} to={link.to} aria-current={selected ? 'page' : undefined}>{link.label}</Link>;
            })}
            <Link className={`library-nav__link ${allBooksActive ? 'is-active' : ''}`} to="/library" aria-current={allBooksActive ? 'page' : undefined}>Все книги</Link>
            <Link className={`library-nav__link ${isFavoriteRoute ? 'is-active' : ''}`} to="/library?favorite=true" aria-current={isFavoriteRoute ? 'page' : undefined}>Избранное</Link>
          </div>
          <div className="library-nav__group">
            <p className="library-nav__heading">Разделы</p>
            <Link className={`library-nav__link ${isQuoteRoute ? 'is-active' : ''}`} to="/quote-library" aria-current={isQuoteRoute ? 'page' : undefined}>Цитатник</Link>
            <span className="library-nav__link library-nav__link--muted">Статистика</span>
            <span className="library-nav__link library-nav__link--muted">Настройки</span>
          </div>
        </nav>

        <div className="library-account">
          <span className="library-account__avatar" aria-hidden="true">{name.charAt(0).toLocaleUpperCase()}</span>
          <span className="library-account__identity"><strong>{name}</strong><small>Личный аккаунт</small></span>
          <button className="library-account__logout" type="button" onClick={signOut} aria-label="Выйти из аккаунта" title="Выйти из аккаунта">↗</button>
        </div>
      </aside>

      <header className="library-mobile-header">
        <Link className="library-brand" to="/library"><Icon type="polka-bordo" styleWidth="21px" classNameIcon="library-brand__icon" /><span>Полка</span></Link>
        {showMobileAddBook && <Button type="added" label="Добавить книгу" icon="plus" iconWidth="12px" width="145px" onClick={() => navigate('/all-books')} />}
      </header>

      <main className="library-main">{children}</main>
    </div>
  );
}
