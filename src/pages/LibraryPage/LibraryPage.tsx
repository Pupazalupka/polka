import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card/Ui/Card';
import { Filter } from '../../components/Filter';
import type { ReadingStatus } from '../../Types/BooksState/BooksState';
import { getBookMeta, useBooks } from '../../Hooks/useBooks';
import { fallbackCover } from '../../utils/bookCovers';
import './LibraryPage.scss';

type LibraryFilter = 'all' | 'reading-now' | 'read' | 'want-read' | 'abandoned' | 'favorites';

const filterOptions: { id: Exclude<LibraryFilter, 'favorites'>; label: string }[] = [
  { id: 'all', label: 'Все книги' },
  { id: 'reading-now', label: 'Читаю сейчас' },
  { id: 'read', label: 'Прочитано' },
  { id: 'want-read', label: 'Хочу прочитать' },
  { id: 'abandoned', label: 'Заброшенное' },
];

const statusLabels: Record<ReadingStatus, string> = {
  'reading-now': 'Читаю сейчас', read: 'Прочитано', 'want-read': 'Хочу прочитать', abandoned: 'Заброшено',
};

function titleCaseCount(count: number) {
  const lastTwo = count % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return `${count} книг`;
  const last = count % 10;
  if (last === 1) return `${count} книга`;
  if (last >= 2 && last <= 4) return `${count} книги`;
  return `${count} книг`;
}

function dateLabel(value?: string) {
  if (!value) return 'Недавно';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(date);
}

export const LibraryPage = () => {
  const { books, loading, error } = useBooks();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const urlStatus = searchParams.get('status') as ReadingStatus | null;
  const favoriteOnly = searchParams.get('favorite') === 'true';
  const activeFilter: LibraryFilter = favoriteOnly ? 'favorites' : (urlStatus ?? 'all');

  const counts = useMemo(() => ({
    all: books.length,
    'reading-now': books.filter((book) => book.status === 'reading-now').length,
    read: books.filter((book) => book.status === 'read').length,
    'want-read': books.filter((book) => book.status === 'want-read').length,
    abandoned: books.filter((book) => book.status === 'abandoned').length,
  }), [books]);

  const filteredBooks = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ru');
    return books.filter((book) => {
      const note = book.note ?? getBookMeta(book.id).note ?? '';
      const matchesQuery = !normalized || `${book.title} ${book.author} ${book.genre} ${note}`.toLocaleLowerCase('ru').includes(normalized);
      const matchesStatus = activeFilter === 'all' || activeFilter === 'favorites' || book.status === activeFilter;
      const matchesFavorite = activeFilter !== 'favorites' || book.favorite;
      return matchesQuery && matchesStatus && matchesFavorite;
    });
  }, [books, query, activeFilter]);

  const recentlyUpdated = useMemo(() => [...filteredBooks].sort((a, b) => {
    const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
    const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
    return dateB - dateA || String(b.id).localeCompare(String(a.id), 'ru', { numeric: true });
  }).slice(0, 5), [filteredBooks]);

  const recentlyAdded = useMemo(() => [...filteredBooks].sort((a, b) => {
    const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
    const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
    return dateB - dateA || String(b.id).localeCompare(String(a.id), 'ru', { numeric: true });
  }).slice(0, 4), [filteredBooks]);

  const setFilter = (filter: LibraryFilter) => {
    if (filter === 'favorites') {
      setSearchParams({ favorite: 'true' });
      return;
    }
    setSearchParams(filter === 'all' ? {} : { status: filter });
  };

  return (
    <section className="library-page">
      <header className="library-page-header library-page-header--library">
        <div><h1>Моя библиотека</h1><p>В вашей коллекции {titleCaseCount(books.length)}</p></div>
        <Button type="added" onClick={() => navigate('/all-books')} label="Добавить книгу" icon="plus" iconWidth="13px" width="185px" />
      </header>

      <label className="library-search">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7" stroke="currentColor" strokeWidth="1.7"/><path d="m16 16 4.1 4.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по названию, автору или заметкам…" aria-label="Поиск по библиотеке" />
      </label>

      <div className="library-filter-row" role="group" aria-label="Фильтр книг">
        {filterOptions.map((item) => <Filter key={item.id} label={`${item.label} ${counts[item.id]}`} size="l" selected={activeFilter === item.id} onClick={() => setFilter(item.id)} />)}
      </div>

      {error && <p className="library-error" role="alert">{error}</p>}
      <section className="library-section" aria-labelledby="recent-books-title">
        <div className="library-section__heading">
          <div><h2 id="recent-books-title">Недавно обновлённые</h2></div>
          <div className="library-view-toggle" aria-label="Вид отображения">
            <button type="button" className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-pressed={view === 'grid'}>Сетка ▦</button>
            <button type="button" className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-pressed={view === 'list'}>Список ☷</button>
          </div>
        </div>
        {loading ? <div className="library-empty">Загружаем вашу полку…</div> : filteredBooks.length === 0 ? <div className="library-empty">Книг по вашему запросу не найдено.</div> : (
          <div className={view === 'grid' ? 'library-book-grid' : 'library-book-list'}>
            {recentlyUpdated.map((book) => <article className="library-book-tile" key={book.id}>
              <Card book={book} type={book.status ?? 'want-read'} fallbackImage={fallbackCover(book)} />
              <Link className="library-book-tile__link" to={`/books/${book.id}`} aria-label={`Открыть книгу «${book.title}»`}>{book.title}</Link>
            </article>)}
          </div>
        )}
      </section>

      <section className="library-section library-section--table" aria-labelledby="recently-added-title">
        <div className="library-section__heading"><h2 id="recently-added-title">Недавно добавленные</h2></div>
        {loading ? <div className="library-empty">Загружаем список…</div> : recentlyAdded.length === 0 ? <div className="library-empty">Здесь появятся добавленные книги.</div> : (
          <div className="library-table-wrap"><table className="library-table">
            <thead><tr><th>Название</th><th>Автор</th><th>Статус</th><th>Оценка</th><th>Добавлена</th></tr></thead>
            <tbody>{recentlyAdded.map((book) => {
              const rating = Number(localStorage.getItem(`rating_${book.id}`) ?? book.rating ?? 0);
              return <tr key={book.id}>
                <td><Link className="library-table__title" to={`/books/${book.id}`}><span className="library-table__thumb"><img src={book.image} alt="" onError={(event) => { event.currentTarget.src = fallbackCover(book); }} /></span>{book.title}</Link></td>
                <td>{book.author}</td><td>{statusLabels[book.status ?? 'want-read']}</td>
                <td className="library-table__rating">{rating ? '★'.repeat(rating) : '—'}</td><td>{dateLabel(book.addedAt)}</td>
              </tr>;
            })}</tbody>
          </table></div>
        )}
      </section>
    </section>
  );
};
