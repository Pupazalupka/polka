import { useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { Filter } from '../../components/Filter';
import { QuoteCard } from '../../components/QuoteCard';
import { QuoteEditor, type QuoteDraft } from '../../components/QuoteEditor';
import { useBooks } from '../../Hooks/useBooks';
import { loadQuotes, saveQuotes } from '../../data/quotes';
import type { Quote } from '../../Types/Quote/Quote';
import './QuoteLibraryPage.scss';

type QuoteTab = 'all' | 'favorites' | 'recent';

export const QuoteLibraryPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>(loadQuotes);
  const [tab, setTab] = useState<QuoteTab>('all');
  const [category, setCategory] = useState('Все темы');
  const [query, setQuery] = useState('');
  const [newestFirst, setNewestFirst] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | undefined>();
  const { books } = useBooks();

  const counts = useMemo(() => ({ all: quotes.length, favorites: quotes.filter((quote) => quote.favorite).length }), [quotes]);
  const categories = useMemo(() => ['Все темы', ...new Set(quotes.map((quote) => quote.category))], [quotes]);
  const filteredQuotes = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('ru');
    const matching = quotes.filter((quote) => {
      const matchesTab = tab !== 'favorites' || quote.favorite;
      const matchesCategory = category === 'Все темы' || quote.category === category;
      const matchesSearch = !term || `${quote.text} ${quote.author} ${quote.bookTitle ?? ''}`.toLocaleLowerCase('ru').includes(term);
      return matchesTab && matchesCategory && matchesSearch;
    });
    const sorted = [...matching].sort((a, b) => newestFirst ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt));
    return tab === 'recent' ? sorted.slice(0, 5) : sorted;
  }, [quotes, tab, category, query, newestFirst]);

  const persist = (next: Quote[]) => { setQuotes(next); saveQuotes(next); };
  const toggleFavorite = (quote: Quote) => persist(quotes.map((item) => item.id === quote.id ? { ...item, favorite: !item.favorite } : item));
  const openNewQuote = () => { setEditingQuote(undefined); setEditorOpen(true); };
  const openEditQuote = (quote: Quote) => { setEditingQuote(quote); setEditorOpen(true); };

  const saveQuote = (draft: QuoteDraft) => {
    const now = new Date().toISOString().slice(0, 10);
    const next = editingQuote
      ? quotes.map((quote) => quote.id === editingQuote.id ? { ...quote, ...draft } : quote)
      : [{ id: `quote-${Date.now()}`, ...draft, createdAt: now, favorite: false }, ...quotes];
    persist(next);
    setEditorOpen(false);
    setEditingQuote(undefined);
  };

  const deleteQuote = (quote: Quote) => {
    if (!window.confirm('Удалить эту цитату?')) return;
    persist(quotes.filter((item) => item.id !== quote.id));
  };

  return (
    <section className="library-page quote-library-page">
      <header className="library-page-header">
        <div><h1>Цитатник</h1><p>Собранные мысли, к которым хочется вернуться</p></div>
        <Button type="added" onClick={openNewQuote} label="Добавить цитату" icon="plus" iconWidth="13px" width="164px" />
      </header>

      <label className="library-search">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7" stroke="currentColor" strokeWidth="1.7"/><path d="m16 16 4.1 4.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по цитате, книге или автору…" aria-label="Поиск по цитатнику" />
      </label>

      <div className="quote-tabs" role="group" aria-label="Разделы цитатника">
        <Filter label={`Все цитаты ${counts.all}`} size="l" selected={tab === 'all'} onClick={() => setTab('all')} />
        <Filter label={`Избранное ${counts.favorites}`} size="l" selected={tab === 'favorites'} onClick={() => setTab('favorites')} />
        <Filter label="Недавно добавленные" size="l" selected={tab === 'recent'} onClick={() => setTab('recent')} />
      </div>

      <div className="quote-toolbar">
        <div className="quote-categories" role="group" aria-label="Темы цитат">
          <span>Фильтры</span>
          {categories.map((item) => <Filter key={item} label={item} size="s" selected={category === item} onClick={() => setCategory(item)} />)}
        </div>
        <button type="button" className="quote-sort" onClick={() => setNewestFirst((value) => !value)}>Сначала {newestFirst ? 'новые' : 'старые'} <span aria-hidden="true">⌄</span></button>
      </div>

      {filteredQuotes.length ? <div className="quote-list">{filteredQuotes.map((quote) => <QuoteCard key={quote.id} quote={quote} onFavorite={() => toggleFavorite(quote)} onEdit={() => openEditQuote(quote)} onDelete={() => deleteQuote(quote)} />)}</div> : <div className="library-empty">По выбранным фильтрам цитат пока нет.</div>}

      {editorOpen && <QuoteEditor books={books} quote={editingQuote} onSave={saveQuote} onClose={() => { setEditorOpen(false); setEditingQuote(undefined); }} />}
    </section>
  );
};
