"use client";
import React, { useState , useContext } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TApiBooks, TestBookApi, TestError, cn } from "@/lib/utils";
import GetBooks from "@/integration/get-books";
import { BookContext } from "@/context/BookContext";
import { TBook } from "@/context/BookContext";


function SearchHandler({ value }: { value: boolean }) {
  const [keyword, setKeyword] = useState<string | null>(null);
  const { changedBooks } = useContext(BookContext);
  

  const SearchHandler = async () => {
    if(!keyword) return;
    let data: TApiBooks | null = null;
    const result = await GetBooks(undefined , undefined , keyword);
    if (typeof result === typeof TestBookApi) {
      // @ts-ignore
      data = result;
    }

    if (!data) return;
    const dataArr : TBook [] = data.data.map(ele=>{
      return {
         _id:ele._id,
         category:ele.category ,
         description : ele.description , 
         price : ele.price , 
         rating : ele.rating,
         title : ele.title ,
         image : ele.image ,
         count_rating : ele.count_rating
      }
    });
   changedBooks(dataArr);
  };

  return (
    <div className={cn(value ? "flex gap-x-3" : "hidden lg:flex gap-x-3")}>
      <Input
        type="text"
        width={50}
        className="w-[200px] lg:w-full"
        onChange={(e) => setKeyword(e.currentTarget.value)}
      />
      <Button className="bg-blue-500 hover:bg-blue-400" onClick={SearchHandler}>
        Search
      </Button>
    </div>
  );
}

export default SearchHandler;
