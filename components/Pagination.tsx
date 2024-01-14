"use client"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import { BookContext } from "@/context/BookContext"
import GetBooks from "@/integration/get-books";
import { TApiBooks, TestBookApi } from "@/lib/utils";
import { useContext, useEffect, useState } from "react"
import { TBook } from "@/context/BookContext";
import { LaodingContext } from "@/context/LoadingContext";

export default function PaginationDemo() {
    const {pagination , changedBooks} = useContext(BookContext);
    let [page ,  setPage ] = useState(1);
    let {setLoading} = useContext(LaodingContext)
    const Generate = () => {
      const size = pagination.countPage ;
      let arr = [];
      for (let i = 0; i < size; i++) {
        arr[i] = i+1 ;
      }
      return arr;
    }

    async function FetchBooks() {
      setLoading(true);
      let data: TApiBooks | null = null;
      try {
        const result = await GetBooks(page);
        if (typeof result === typeof TestBookApi) {
          // @ts-ignore
          data = result;
        }
      } catch (err:any) {
        console.log( "err",err.message);
      }
      if(!data)
        return;
      let validData: TBook [] = data.data?.map(ele=>{
        return {
          _id : ele._id,
          category : ele.category,
          description : ele.description,
          price : ele.price ,
          rating : ele.rating,
          title : ele.title,
          image : ele.image,
          count_rating : ele.count_rating, 
        }
      });
      if(validData?.length == 0 )
        return;
      

      changedBooks(validData, data.pagination)
    }

    useEffect(()=>{
        FetchBooks()
        setLoading(false)
    } , [page])
    const GeneratedArr = Generate();
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {
            GeneratedArr.map((ele)=>(
            <PaginationItem  onClick={()=>setPage(ele)} className="cursor-pointer">
              <PaginationLink>{ele}</PaginationLink>
            </PaginationItem>
            ))
          }
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  