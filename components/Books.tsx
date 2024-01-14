"use client";
import React, { useEffect} from "react";
import { useContext } from "react";
import { BookContext, TBook } from "@/context/BookContext";
import { TApiBooks } from "@/lib/utils";
import BookContainer from "./BookContainer";
import SpinnerLoading from "./Loader";
import EmptyPage from "./EmptyPage";
import MobileContainerBook from "./MobileContainerBook";
import { LaodingContext } from "@/context/LoadingContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "./ui/use-toast";
function Books({ books }: { books: TApiBooks }) {
  const { changedBooks, books: listBook } = useContext(BookContext);
  const { Loading, setLoading } = useContext(LaodingContext);
  const searchParams = useSearchParams();
  const payement = searchParams.get('payement');
  const router = useRouter()
  const checkPayement = ( ) => {
    if(payement == "cancel"){
      toast({
        description : "order is echec",
        duration : 3000 ,
        variant : "destructive"
      });
      router.push("/")
    }
  }

  const Book : TBook[] = books.data.map((book) => {
      return {
        _id: book._id,
        description: book.description,
        price: book.price,
        rating:book.rating,
        title: book.title,
        image: book.image,
        category: book.category,
        count_rating : book.count_rating
      }})

  useEffect(() => {
    changedBooks(Book, books.pagination);
    checkPayement()
  }, []);

  
  return (
    <>
      {Loading ? (
        <SpinnerLoading />
      ) : (
        <>
          <div className="hidden md:flex md:flex-col md:gap-y-5 ">
            {listBook.length > 0 ? (
              <>
                {listBook.map((book) => {
                  return (
                    <BookContainer
                      _id={book._id}
                      description={book.description}
                      price={book.price}
                      rating={book.rating}
                      title={book.title}
                      image={book?.image}
                      key={book._id}
                    />
                  );
                })}
              </>
            ) : (
              <EmptyPage />
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-3 w-full md:hidden">
            {listBook.length > 0 ? (
              <>
                {listBook.map((book) => {
                  return (
                    <MobileContainerBook
                      _id={book._id}
                      price={book.price}
                      title={book.title}
                      image={book?.image || "/book.avif"}
                    />
                  );
                })}
              </>
            ) : (
              <EmptyPage />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Books;
