export interface Quote {
  id: string;
  text: string;
  author: string;
  bookId?: string;
  bookTitle?: string;
  category: string;
  createdAt: string;
  favorite: boolean;
}
