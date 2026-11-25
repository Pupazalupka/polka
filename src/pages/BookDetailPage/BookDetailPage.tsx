import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { BookCover } from '../../components/BookCover';
import { QuoteCard } from '../../components/QuoteCard';
import { QuoteEditor, type QuoteDraft } from '../../components/QuoteEditor';
import { Status } from '../../components/Status';
import { useBooks } from '../../Hooks/useBooks';
import { loadQuotes, saveQuotes } from '../../data/quotes';
import type { Quote } from '../../Types/Quote/Quote';
import type { ReadingStatus } from '../../Types/BooksState/BooksState';
import './BookDetailPage.scss';

type DetailTab = 'about' | 'notes' | 'quotes' | 'history';
const statusLabel: Record<ReadingStatus, string> = { 'reading-now': 'Читаю сейчас', read: 'Прочитано', 'want-read': 'Хочу прочитать', abandoned: 'Заброшено' };

export const BookDetailPage = () => {
  const { id = '' } = useParams();
  const { books, loading, error, updateBook } = useBooks();
  const book = books.find((item) => item.id === id);
  const [tab, setTab] = useState<DetailTab>('about');
  const [quotes, setQuotes] = useState<Quote[]>(loadQuotes);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | undefined>();
  const [noteDraft, setNoteDraft] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const bookQuotes = useMemo(() => book ? quotes.filter((quote) => quote.bookId === book.id || quote.bookTitle?.toLocaleLowerCase('ru') === book.title.toLocaleLowerCase('ru')) : [], [quotes, book]);

  useEffect(() => { setNoteDraft(book?.note ?? ''); }, [book?.id, book?.note]);

  const changeStatus = (status: ReadingStatus) => {
    if (!book) return;
    const progress = status === 'read' ? 100 : status === 'want-read' ? 0 : book.progress ?? 1;
    updateBook(book.id, { status, progress });
  };

  const saveNote = () => {
    if (!book) return;
    updateBook(book.id, { note: noteDraft });
    setNoteSaved(true);
    window.setTimeout(() => setNoteSaved(false), 1800);
  };

  const saveQuote = (draft: QuoteDraft) => {
    if (!book) return;
    const next = editingQuote
      ? quotes.map((quote) => quote.id === editingQuote.id ? { ...quote, ...draft, bookId: book.id, bookTitle: book.title } : quote)
      : [{ id: `quote-${Date.now()}`, ...draft, bookId: book.id, bookTitle: book.title, createdAt: new Date().toISOString().slice(0, 10), favorite: false }, ...quotes];
    setQuotes(next);
    saveQuotes(next);
    setEditorOpen(false);
    setEditingQuote(undefined);
  };

  const toggleQuoteFavorite = (target: Quote) => {
    const next = quotes.map((quote) => quote.id === target.id ? { ...quote, favorite: !quote.favorite } : quote);
    setQuotes(next); saveQuotes(next);
  };

  const deleteQuote = (target: Quote) => {
    if (!window.confirm('Удалить эту цитату?')) return;
    const next = quotes.filter((quote) => quote.id !== target.id);
    setQuotes(next); saveQuotes(next);
  };

  if (loading) return <section className="library-page"><div className="library-empty">Загружаем книгу…</div></section>;
  if (error || !book) return <section className="library-page"><div className="library-error" role="alert">{error || 'Книга не найдена в библиотеке.'}</div><Link className="detail-back" to="/library">← Назад к библиотеке</Link></section>;

  const rating = Number(book.rating ?? localStorage.getItem(`rating_${book.id}`) ?? 0);
  const currentStatus = book.status ?? 'want-read';
  const favoriteQuote = bookQuotes.find((quote) => quote.favorite) ?? bookQuotes[0];

  const renderTabContent = () => {
    if (tab === 'notes') return <section className="detail-panel detail-notes"><h2>Мои заметки</h2><p className="detail-muted">Личные мысли о книге сохраняются в вашей полке.</p><textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} rows={7} placeholder="Запишите наблюдение, идею или страницу, к которой хотите вернуться…" /><Button type="added" onClick={saveNote} label={noteSaved ? 'Сохранено' : 'Сохранить заметку'} icon="save" iconWidth="14px" /></section>;
    if (tab === 'quotes') return <section className="detail-quotes"><div className="detail-section-head"><div><h2>Цитаты из книги</h2><p>{bookQuotes.length} {bookQuotes.length === 1 ? 'цитата' : 'цитат'}</p></div><Button type="added" onClick={() => { setEditingQuote(undefined); setEditorOpen(true); }} label="Добавить цитату" icon="plus" iconWidth="12px" /></div>{bookQuotes.length ? <div className="detail-quote-list">{bookQuotes.map((quote) => <QuoteCard key={quote.id} quote={quote} onFavorite={() => toggleQuoteFavorite(quote)} onEdit={() => { setEditingQuote(quote); setEditorOpen(true); }} onDelete={() => deleteQuote(quote)} />)}</div> : <div className="library-empty">Цитат из этой книги пока нет.</div>}</section>;
    if (tab === 'history') return <section className="detail-panel"><h2>История чтения</h2><div className="detail-history-item"><span className="detail-history-dot"/><div><strong>{statusLabel[currentStatus]}</strong><p>Текущий статус книги · {book.progress ?? 0}%</p></div></div><p className="detail-muted">Предыдущие периоды чтения появятся здесь, когда будут добавлены в историю.</p></section>;
    return <div className="detail-content-grid">
      <section className="detail-panel detail-about"><h2>О книге</h2><p className="detail-description">{book.description || 'Описание этой книги пока не добавлено. Вы можете сохранить собственную заметку и цитаты на странице книги.'}</p><dl className="detail-facts"><div><dt>Автор</dt><dd>{book.author}</dd></div><div><dt>Год издания</dt><dd>{book.year || '—'}</dd></div><div><dt>Жанр</dt><dd>{book.genre || '—'}</dd></div><div><dt>Издательство</dt><dd>{book.publisher || '—'}</dd></div><div><dt>Страниц</dt><dd>{book.pages || '—'}</dd></div></dl></section>
      <div className="detail-side-panels"><section className="detail-panel detail-favorite-quote"><h2>Любимая цитата</h2>{favoriteQuote ? <><blockquote>«{favoriteQuote.text}»</blockquote><p>— {favoriteQuote.author}</p><button type="button" className="detail-panel-link" onClick={() => setTab('quotes')}>Все цитаты →</button></> : <><p className="detail-muted">Пока нет сохранённых цитат из этой книги.</p><button type="button" className="detail-panel-link" onClick={() => { setEditingQuote(undefined); setEditorOpen(true); }}>Добавить цитату →</button></>}</section>
        <section className="detail-panel detail-my-note"><h2>Моя заметка</h2><p>{book.note || 'Здесь появятся ваши мысли о прочитанном.'}</p><button type="button" className="detail-panel-link" onClick={() => setTab('notes')}>{book.note ? 'Изменить заметку →' : 'Добавить заметку →'}</button></section></div>
    </div>;
  };

  return (
    <section className="library-page book-detail-page">
      <div className="detail-topbar"><Link className="detail-back" to="/library">← Назад к библиотеке</Link><button type="button" className="detail-more" onClick={() => setTab('notes')}>Редактировать заметку</button></div>
      <section className="book-hero">
        <BookCover book={book} className="book-hero__cover" />
        <div className="book-hero__info">
          <h1>{book.title}</h1><p className="book-hero__author">{book.author}</p>
          <div className="book-hero__rating" role="group" aria-label="Оценка книги">
            {Array.from({ length: 5 }, (_, index) => { const value = index + 1; return <button key={value} type="button" className={value <= rating ? 'is-active' : ''} onClick={() => updateBook(book.id, { rating: value })} aria-label={`${value} из 5`} aria-pressed={rating === value}>★</button>; })}
            <span>Оценить книгу</span>
          </div>
          <div className="book-hero__status-row"><Status type={currentStatus} size="s" /><label className="book-hero__status-select">Изменить статус<select value={currentStatus} onChange={(event) => changeStatus(event.target.value as ReadingStatus)} aria-label="Статус чтения"><option value="reading-now">Читаю сейчас</option><option value="read">Прочитано</option><option value="want-read">Хочу прочитать</option><option value="abandoned">Заброшено</option></select></label></div>
          <div className="book-hero__actions"><Button type="default" onClick={() => updateBook(book.id, { favorite: !book.favorite })} label={book.favorite ? '♥ В избранном' : '♡ В избранное'} classNameButton="book-hero__favorite" /><Button type="added" onClick={() => setTab('notes')} label="Добавить заметку" icon="plus" iconWidth="12px" /></div>
          <div className="book-hero__meta"><div><span>Добавлена на полку</span><strong>{book.addedAt ? new Date(book.addedAt).toLocaleDateString('ru-RU') : 'Недавно'}</strong></div><div><span>Формат</span><strong>{book.format || 'Бумажная книга'}</strong></div><div className="book-hero__progress"><span>Прогресс чтения</span><strong>{book.progress ?? 0}%</strong><div><i style={{ width: `${Math.max(0, Math.min(100, book.progress ?? 0))}%` }} /></div></div></div>
        </div>
      </section>

      <nav className="book-detail-tabs" aria-label="Разделы книги">
        {([['about', 'О книге'], ['notes', `Заметки${book.note ? ' (1)' : ''}`], ['quotes', `Цитаты (${bookQuotes.length})`], ['history', 'История чтения']] as [DetailTab, string][]).map(([idValue, label]) => <button key={idValue} type="button" className={tab === idValue ? 'is-active' : ''} onClick={() => setTab(idValue)}>{label}</button>)}
      </nav>

      {renderTabContent()}
      {editorOpen && <QuoteEditor books={books} quote={editingQuote} defaultBookId={book.id} onSave={saveQuote} onClose={() => { setEditorOpen(false); setEditingQuote(undefined); }} />}
    </section>
  );
};
