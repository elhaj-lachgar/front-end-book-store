"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import PaginationAdmin from "./PaginationAdmin";
import { TPagination } from "@/context/BookContext";

export default function App({
  data,
  setPage,
}: {
  data: TPagination;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <h1>{isClient ? <PaginationAdmin data={data} setPage={setPage}/> : null}</h1>;
}
