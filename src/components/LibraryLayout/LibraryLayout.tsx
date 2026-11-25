import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { LibrarySidebar } from '../LibrarySidebar';
import { Icon } from '../Icon';
import './LibraryLayout.scss';

interface LibraryLayoutProps {
  children: ReactNode;
}

export function LibraryLayout({ children }: LibraryLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const showMobileAddBook = location.pathname === '/library';

  return (
    <div className="library-shell">
      <LibrarySidebar />

      <header className="library-mobile-header">
        <Link className="library-brand" to="/library"><Icon type="polka-bordo" styleWidth="21px" classNameIcon="library-brand__icon" /><span>Полка</span></Link>
        {showMobileAddBook && <Button type="added" label="Добавить книгу" icon="plus" iconWidth="12px" width="145px" onClick={() => navigate('/all-books')} />}
      </header>

      <main className="library-main">{children}</main>
    </div>
  );
}
