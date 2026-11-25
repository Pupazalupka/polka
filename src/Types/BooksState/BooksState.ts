export type ReadingStatus = 'reading-now' | 'read' | 'want-read' | 'abandoned';

export interface BooksState {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  image: string;
  progress?: number;
  status?: ReadingStatus;
  rating?: number;
  favorite?: boolean;
  addedAt?: string;
  note?: string;
  description?: string;
  publisher?: string;
  pages?: number;
  format?: string;
}
