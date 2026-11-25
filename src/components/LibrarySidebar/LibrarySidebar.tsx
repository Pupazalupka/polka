import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { LibraryAccount } from './LibraryAccount';

const readingLinks = [
  { label: 'Сейчас читаю', to: '/library?status=reading-now' },
  { label: 'Прочитано', to: '/library?status=read' },
  { label: 'Хочу прочитать', to: '/library?status=want-read' },
  { label: 'Заброшенное', to: '/library?status=abandoned' },
];

export function LibrarySidebar() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentStatus = params.get('status');
  const isLibraryRoute = location.pathname === '/library' || location.pathname.startsWith('/books/');
  const isQuoteRoute = location.pathname === '/quote-library';
  const isCatalogRoute = location.pathname === '/all-books';
  const isFavoriteRoute = params.get('favorite') === 'true';
  const allBooksActive = isCatalogRoute || (isLibraryRoute && !currentStatus && !isFavoriteRoute);

  return (
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

      <LibraryAccount />
    </aside>
  );
}
