"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TPagination } from "@/context/BookContext";
import { Dispatch, SetStateAction, useState } from "react";

function PaginationAdmin({
  data,
  setPage,
}: {
  data: TPagination;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const Generetor = (size: number) => {
    let arr: number[] = [];
    for (let i = 0; i < size ; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  let Array = Generetor(data.countPage || 1 );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {Array.map((index) => (
          <PaginationItem className="cursor-pointer" onClick={()=>setPage(index)}>
            <PaginationLink>{index}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationAdmin;
