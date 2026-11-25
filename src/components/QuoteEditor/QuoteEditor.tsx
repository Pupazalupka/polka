import { useState, type FormEvent } from 'react';
import type { BooksState } from '../../Types/BooksState';
import type { Quote } from '../../Types/Quote/Quote';
import { Icon } from '../Icon';
import './QuoteEditor.scss';

export type QuoteDraft = Pick<Quote, 'text' | 'author' | 'category'> & Partial<Pick<Quote, 'bookId' | 'bookTitle'>>;

interface QuoteEditorProps {
  books: BooksState[];
  quote?: Quote;
  defaultBookId?: string;
  onSave: (quote: QuoteDraft) => void;
  onClose: () => void;
}

export function QuoteEditor({ books, quote, defaultBookId, onSave, onClose }: QuoteEditorProps) {
  const [text, setText] = useState(quote?.text ?? '');
  const [author, setAuthor] = useState(quote?.author ?? '');
  const [category, setCategory] = useState(quote?.category ?? 'Мысли');
  const [bookId, setBookId] = useState(quote?.bookId ?? defaultBookId ?? '');
  const [freeBookTitle, setFreeBookTitle] = useState(quote?.bookTitle ?? '');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedBook = books.find((book) => book.id === bookId);
    onSave({
      text: text.trim(),
      author: author.trim(),
      category,
      ...(selectedBook ? { bookId: selectedBook.id, bookTitle: selectedBook.title } : (freeBookTitle.trim() ? { bookTitle: freeBookTitle.trim() } : {})),
    });
  };

  return (
    <div className="quote-editor-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="quote-editor" role="dialog" aria-modal="true" aria-labelledby="quote-editor-title">
        <div className="quote-editor__heading">
          <div><span>ЦИТАТНИК</span><h2 id="quote-editor-title">{quote ? 'Изменить цитату' : 'Добавить цитату'}</h2></div>
          <button type="button" className="quote-editor__close" aria-label="Закрыть" onClick={onClose}><Icon type="close" styleWidth="15px" /></button>
        </div>
        <form onSubmit={submit}>
          <label className="quote-editor__field"><span>Цитата</span><textarea required rows={4} maxLength={500} value={text} onChange={(event) => setText(event.target.value)} placeholder="Запишите мысль, к которой хочется вернуться…" /></label>
          <div className="quote-editor__two-col">
            <label className="quote-editor__field"><span>Автор</span><input required value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Имя автора" /></label>
            <label className="quote-editor__field"><span>Тема</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Мысли</option><option>Книги</option><option>Фантастика</option><option>Другое</option></select></label>
          </div>
          <label className="quote-editor__field"><span>Книга</span><select value={bookId} onChange={(event) => setBookId(event.target.value)}><option value="">Не выбрана</option>{books.map((book) => <option key={book.id} value={book.id}>{book.title}</option>)}</select></label>
          {!bookId && <label className="quote-editor__field"><span>Название книги (если нет в библиотеке)</span><input value={freeBookTitle} onChange={(event) => setFreeBookTitle(event.target.value)} placeholder="Например, Маленький принц" /></label>}
          <div className="quote-editor__footer"><button type="button" className="quote-editor__cancel" onClick={onClose}>Отмена</button><button type="submit" className="quote-editor__save">{quote ? 'Сохранить' : 'Сохранить цитату'}</button></div>
        </form>
      </section>
    </div>
  );
}
