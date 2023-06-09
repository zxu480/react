export interface Book {
  id: string;
  title: string;
  authors: string[];
  averageRating?: string;
  canonicalVolumeLink?: string;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
}

export interface SearchState {
  query: string;
  loading: boolean;
  books: Book[];
  errorMsg: string | null;
  totalPages: number
  currentPage: number
  pageSize: number
  suggestions: string[]
}

export interface WishListState {
  wishListBooks: Book[];
}

export interface MenuItem {
  key: string;
  label: string;
  icon: any;
  path: string;
}
