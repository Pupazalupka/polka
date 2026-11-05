import type { BooksState } from "../../../Types";

export interface IProps {
  book: BooksState,
  rating?: number,
  type: 'reading-now' | 'read' | 'want-read' | 'abandoned',
};