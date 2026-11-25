import type { BooksState } from '../../Types/BooksState';
import { fallbackCover } from '../../utils/bookCovers';

interface BookCoverProps {
  book: Pick<BooksState, 'id' | 'title' | 'image'>;
  className?: string;
}

export function BookCover({ book, className = '' }: BookCoverProps) {
  return (
    <img
      className={className}
      src={book.image}
      alt={`Обложка книги «${book.title}»`}
      onError={(event) => {
        const image = event.currentTarget;
        if (!image.dataset.fallbackApplied) {
          image.dataset.fallbackApplied = 'true';
          image.src = fallbackCover(book);
        }
      }}
    />
  );
}
