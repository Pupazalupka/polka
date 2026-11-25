import cityCover from '../assets/covers/night-city.jpg';
import spaceCover from '../assets/covers/space.jpg';
import desertCover from '../assets/covers/desert.jpg';
import forestCover from '../assets/covers/forest.jpg';
import type { BooksState } from '../Types/BooksState';

export function fallbackCover(book: Pick<BooksState, 'id' | 'title'>): string {
  if (book.id === '1') return cityCover;
  if (book.id === '2') return forestCover;
  if (book.id === '3') return cityCover;
  if (book.id === '4') return spaceCover;
  if (/дюн/i.test(book.title)) return desertCover;
  return forestCover;
}
