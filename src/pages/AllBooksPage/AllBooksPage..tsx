import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { BookCover } from '../../components/BookCover';
import { createBook } from '../../Api';
import type { BooksState } from '../../Types/BooksState';
import { useBooks } from '../../Hooks/useBooks';
import { fallbackCover } from '../../utils/bookCovers';
import './AllBooksPage.scss';

const mockupSuggestions: BooksState[] = [
  { id: 'catalog-dune', title: 'Дюна', author: 'Фрэнк Герберт', year: 1965, genre: 'Научная фантастика', image: '/img/Dune.jpg', progress: 0 },
  { id: 'catalog-dune-messiah', title: 'Дюна. Мессия', author: 'Фрэнк Герберт', year: 1969, genre: 'Научная фантастика', image: '/img/DuneMessiah.jpg', progress: 0 },
  { id: 'catalog-children-dune', title: 'Дети Дюны', author: 'Фрэнк Герберт', year: 1976, genre: 'Научная фантастика', image: '/img/ChildrenOfDune.jpg', progress: 0 },
];

export const AllBooksPage = () => {
  const { books } = useBooks();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [savingId, setSavingId] = useState('');
  const [message, setMessage] = useState('');
  const [manualTitle, setManualTitle] = useState('');
  const [manualAuthor, setManualAuthor] = useState('');
  const [manualYear, setManualYear] = useState('');
  const [manualGenre, setManualGenre] = useState('');

  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('ru');
    const catalog = [...mockupSuggestions, ...books];
    if (!searched || !term) return mockupSuggestions;
    return catalog.filter((book) => `${book.title} ${book.author} ${book.genre} ${book.year}`.toLocaleLowerCase('ru').includes(term));
  }, [books, query, searched]);

  const isInLibrary = (candidate: BooksState) => books.some((book) => book.id === candidate.id || (book.title.toLocaleLowerCase('ru') === candidate.title.toLocaleLowerCase('ru') && book.author.toLocaleLowerCase('ru') === candidate.author.toLocaleLowerCase('ru')));

  const addToLibrary = async (candidate: BooksState) => {
    if (isInLibrary(candidate)) return;
    setSavingId(candidate.id);
    setMessage('');
    try {
      const newBook: BooksState = { ...candidate, id: String(Date.now()), image: fallbackCover(candidate), progress: 0, status: 'want-read', addedAt: new Date().toISOString() };
      await createBook(newBook);
      navigate('/library');
    } catch {
      setMessage('Не удалось сохранить книгу. Проверьте соединение с сервером и попробуйте ещё раз.');
    } finally {
      setSavingId('');
    }
  };

  const addManualBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    const draft: BooksState = {
      id: String(Date.now()),
      title: manualTitle.trim(),
      author: manualAuthor.trim(),
      year: Number(manualYear) || new Date().getFullYear(),
      genre: manualGenre.trim() || 'Без жанра',
      image: fallbackCover({ id: 'manual-book', title: manualTitle }),
      progress: 0,
      status: 'want-read',
      addedAt: new Date().toISOString(),
    };
    try {
      await createBook(draft);
      navigate('/library');
    } catch {
      setMessage('Не удалось сохранить книгу. Проверьте соединение с сервером и попробуйте ещё раз.');
    }
  };

  return (
    <section className="library-page add-book-page">
      <header className="library-page-header"><div><h1>Добавить книгу</h1><p>Найдите книгу в каталоге или внесите её вручную</p></div></header>

      <section className="catalog-search-panel" aria-labelledby="catalog-search-title">
        <h2 id="catalog-search-title">Поиск в каталоге</h2>
        <form className="catalog-search-form" onSubmit={(event) => { event.preventDefault(); setSearched(true); }}>
          <label className="catalog-search-input">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7" stroke="currentColor" strokeWidth="1.7"/><path d="m16 16 4.1 4.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Введите название, автора или ISBN" aria-label="Поиск книги в каталоге" />
          </label>
          <Button type="added" onClick={() => setSearched(true)} label="Найти книгу" width="158px" />
        </form>
        <p className="catalog-search-panel__hint">Например: «Дюна», «Фрэнк Герберт» или ISBN 978…</p>
      </section>

      {message && <p className="library-error" role="alert">{message}</p>}

      <section className="catalog-results" aria-labelledby="catalog-results-title">
        <div className="library-section__heading"><div><h2 id="catalog-results-title">Результаты поиска</h2><p>Найдено {results.length} {results.length === 1 ? 'книга' : results.length >= 2 && results.length <= 4 ? 'книги' : 'книг'}</p></div></div>
        {results.length === 0 ? <div className="library-empty">Совпадений не найдено. Добавьте книгу вручную.</div> : results.map((book) => {
          const inLibrary = isInLibrary(book);
          return <article className="catalog-result" key={book.id}>
            <BookCover book={book} className="catalog-result__cover" />
            <div className="catalog-result__info"><h3>{book.title}</h3><p>{book.author}</p><small>{book.year} · {book.genre}</small></div>
            {inLibrary ? <span className="catalog-result__added">Уже в библиотеке</span> : <Button type="default" onClick={() => addToLibrary(book)} label={savingId === book.id ? 'Добавляем…' : 'Добавить'} icon="plus" iconWidth="12px" width="112px" classNameButton="catalog-result__add" />}
          </article>;
        })}
      </section>

      <section className="catalog-manual">
        <h2>Не нашли нужную книгу?</h2>
        <p>Добавьте её вручную — это займёт меньше минуты.</p>
        {!manualOpen ? <Button type="added" onClick={() => setManualOpen(true)} label="Добавить вручную" /> : (
          <form className="catalog-manual-form" onSubmit={addManualBook}>
            <label>Название<input required value={manualTitle} onChange={(event) => setManualTitle(event.target.value)} /></label>
            <label>Автор<input required value={manualAuthor} onChange={(event) => setManualAuthor(event.target.value)} /></label>
            <div className="catalog-manual-form__row"><label>Год издания<input type="number" min="0" max="2100" value={manualYear} onChange={(event) => setManualYear(event.target.value)} /></label><label>Жанр<input value={manualGenre} onChange={(event) => setManualGenre(event.target.value)} /></label></div>
            <div className="catalog-manual-form__actions"><button type="button" className="catalog-manual-form__cancel" onClick={() => setManualOpen(false)}>Отмена</button><button type="submit" className="catalog-manual-form__submit">Добавить в библиотеку</button></div>
          </form>
        )}
      </section>
    </section>
  );
};
