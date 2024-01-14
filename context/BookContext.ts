import { createContext } from "react";

export type TBook = {
  _id: string;
  description: string;
  rating: number;
  price: {
      value : number,
      currency : "USD" | "EUR" | "MAD"
  };
  title: string;
  image?: string;
  category: string;
  count_rating:number;
};

export type TPagination = {
  countPage: number;
  perPage?: number;
  nextPage?: number;
  currentPage?:number;
};

export interface TBookContext {
  books: TBook[];
  changedBooks: (books: TBook[], pagination?: TPagination) => void;
  pagination: TPagination;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialize_book: TBookContext = {
  books: [],
  changedBooks: () => {},
  pagination: {
    countPage: 0,
  },
  isLoading: false,
  setLoading: (pre) => {
    pre = false;
  },
};

export const BookContext = createContext<TBookContext>(initialize_book);
