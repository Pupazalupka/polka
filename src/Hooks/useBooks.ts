import { useEffect, useState } from 'react';
import { getBooksStats } from '../Api';
import type { BooksState, ReadingStatus } from '../Types/BooksState';

const META_PREFIX = 'polka:book-meta:';

export type BookMeta = Pick<BooksState, 'status' | 'rating' | 'favorite' | 'addedAt' | 'note' | 'progress'>;

export function getBookMeta(id: string): BookMeta {
  try {
    const saved = JSON.parse(localStorage.getItem(`${META_PREFIX}${id}`) ?? '{}') as BookMeta;
    const rating = localStorage.getItem(`rating_${id}`);
    return { ...saved, ...(rating ? { rating: Number(rating) } : {}) };
  } catch {
    return {};
  }
}

export function saveBookMeta(id: string, update: Partial<BookMeta>) {
  const current = getBookMeta(id);
  localStorage.setItem(`${META_PREFIX}${id}`, JSON.stringify({ ...current, ...update }));
  if (typeof update.rating === 'number') localStorage.setItem(`rating_${id}`, String(update.rating));
}

function defaultStatus(book: BooksState): ReadingStatus {
  if (book.status) return book.status;
  if ((book.progress ?? 0) >= 100) return 'read';
  if ((book.progress ?? 0) > 0) return 'reading-now';
  return 'want-read';
}

function withMeta(book: BooksState): BooksState {
  const saved = getBookMeta(book.id);
  return {
    ...book,
    ...saved,
    status: saved.status ?? defaultStatus(book),
    rating: saved.rating ?? book.rating ?? 0,
    favorite: saved.favorite ?? book.favorite ?? false,
    progress: saved.progress ?? book.progress ?? 0,
  };
}

export function useBooks() {
  const [books, setBooks] = useState<BooksState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getBooksStats()
      .then((data) => { if (active) setBooks(data.map(withMeta)); })
      .catch(() => { if (active) setError('Не удалось загрузить книги. Проверьте соединение с сервером.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const updateBook = (id: string, patch: Partial<BookMeta>) => {
    saveBookMeta(id, patch);
    setBooks((current) => current.map((book) => book.id === id ? { ...book, ...patch } : book));
  };

  return { books, loading, error, updateBook };
}
