import { useState } from 'react';
import type { Quote } from '../../Types/Quote/Quote';
import './QuoteCard.scss';

interface QuoteCardProps {
  quote: Quote;
  onFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export function QuoteCard({ quote, onFavorite, onEdit, onDelete }: QuoteCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <article className="quote-row">
      <span className="quote-row__ornament" aria-hidden="true">“</span>
      <div className="quote-row__body">
        <blockquote>«{quote.text}»</blockquote>
        <p className="quote-row__author">— {quote.author}</p>
        {quote.bookTitle && <p className="quote-row__book">Из книги: <strong>{quote.bookTitle}</strong></p>}
      </div>
      <span className="quote-row__category">{quote.category}</span>
      <time className="quote-row__date" dateTime={quote.createdAt}>{formatDate(quote.createdAt)}</time>
      <div className="quote-row__actions">
        <button type="button" className={`quote-icon-button ${quote.favorite ? 'is-favorite' : ''}`} onClick={onFavorite} aria-label={quote.favorite ? 'Убрать из избранного' : 'Добавить в избранное'} title={quote.favorite ? 'Убрать из избранного' : 'Добавить в избранное'}>{quote.favorite ? '♥' : '♡'}</button>
        <div className="quote-row__menu-wrap">
          <button type="button" className="quote-icon-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Дополнительные действия">···</button>
          {menuOpen && <div className="quote-row__menu"><button type="button" onClick={() => { setMenuOpen(false); onDelete(); }}>Удалить цитату</button></div>}
        </div>
        <button type="button" className="quote-row__edit" onClick={onEdit}>Изменить</button>
      </div>
    </article>
  );
}
