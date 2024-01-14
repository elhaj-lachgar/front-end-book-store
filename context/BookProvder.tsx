"use client";
import React, { useState } from "react";
import { BookContext, TBook , TPagination } from "./BookContext";

function BookProvder({ children }: { children: React.ReactNode }) {
  let [books, setBooks] = useState<TBook[]>([]);
  let [ pagination , setPagination] = useState<TPagination>({countPage : 0 ,})
  let [ Loading , setLoading] = useState(true);

  const changedBooks = (book: TBook[] , Newpagination? : TPagination ) => {
    if (book != books){
      setBooks([...book]);
    }
    if (!Newpagination){
      setPagination({countPage: 1});
    }
    else{
      setPagination(Newpagination);
    }
    setLoading(false)
  };

  return (
    <BookContext.Provider value={{ books, changedBooks , pagination , isLoading : Loading , setLoading }}>
      {children}
    </BookContext.Provider>
  );
}

export default BookProvder;
