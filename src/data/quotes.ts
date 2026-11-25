import type { Quote } from '../Types/Quote/Quote';

export const initialQuotes: Quote[] = [
  { id: 'q1', text: 'В каждом человеке солнце. Только дайте ему светить.', author: 'Сократ', bookTitle: 'Мысли на каждый день', category: 'Мысли', createdAt: '2026-09-30', favorite: true },
  { id: 'q2', text: 'Книги — это уникальная форма магии.', author: 'Стивен Кинг', bookTitle: 'Как писать книги', category: 'Книги', createdAt: '2026-09-28', favorite: false },
  { id: 'q3', text: 'Мы в ответе за тех, кого приручили.', author: 'Антуан де Сент-Экзюпери', bookTitle: 'Маленький принц', category: 'Мысли', createdAt: '2026-09-24', favorite: false },
  { id: 'q4', text: 'Страх — это убийца разума.', author: 'Фрэнк Герберт', bookTitle: 'Дюна', category: 'Фантастика', createdAt: '2026-09-21', favorite: true },
  { id: 'q5', text: 'Человек может всё, пока не решит, что не может.', author: 'Эрнест Хемингуэй', bookTitle: 'Старик и море', category: 'Мысли', createdAt: '2026-09-18', favorite: false },
];

const STORAGE_KEY = 'polka-quotes';

export function loadQuotes(): Quote[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) as Quote[] : initialQuotes;
  } catch {
    return initialQuotes;
  }
}

export function saveQuotes(quotes: Quote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}
