"use client";
import GetBooks from "@/integration/get-books";
import React, { useEffect, useState } from "react";
import { TBook, TPagination } from "@/context/BookContext";
import { TApiBooks } from "@/lib/utils";
import PaginationHandler from "./AdminPaginationHandler"
import ProductItems from "./ProductItems";
import { FilePlus } from 'lucide-react';
import AddProductModule from "./AddProductModule";

function AllProducts() {
  let [page, setPage] = useState(0);
  let [data, setData] = useState<TBook[]>([]);
  let [pagination, setPagination] = useState<TPagination>({ countPage: 0 });

  const Fetching = async () => {
    const responce = await GetBooks(page);
    // @ts-ignore
    if (responce.data) {
      //@ts-ignore
      let books: TApiBooks = responce;

      let arr: TBook[] = books.data.map((book) => {
        return {
          _id: book._id,
          category: book.category,
          description: book.description,
          price: book.price,
          rating: Math.floor(Math.random() * 3 + 2),
          title: book.title,
          image: book.image,
        };
      });
      setPagination(books.pagination);
      setData(arr);
    }
  };

  useEffect(() => {
    Fetching();
  }, [page]);
  return (
    <div className="flex flex-col w-11/12 lg:9/12 mx-auto gap-y-5 justify-center absolute lg:relative top-10">
      {
        data.map(ele => (
          <ProductItems data={ele}/>
        ))
      }
      <PaginationHandler setPage={setPage} data={pagination} />
    </div>
  );
}

export default AllProducts;
