"use client";
import { TPagination } from "@/context/BookContext";
import GetBooks from "@/integration/get-books";
import { TUser } from "@/integration/sign";
import React, { useEffect, useState } from "react";
import PaginationHandler from "./AdminPaginationHandler";
import GetAllUsers from "@/integration/get-all-users";
import UserItem from "./UserItem";
function UsersComp() {
  let [page, setPage] = useState(0);
  let [data, setData] = useState<TUser[]>([]);
  let [pagination, setPagination] = useState<TPagination>({ countPage: 0 });
  const Fetching = async () => {
    const res = await GetAllUsers(page);
    if (res != null) {
      setData(res.data);
      setPagination(res.pagination);
      return;
    }

    return;
  };

  useEffect(() => {
    Fetching();
  }, []);
  return (
    <div className="flex flex-col w-11/12 lg:9/12 mx-auto gap-y-5 justify-center  absolute lg:relative mt-10 ">
      {data.map((book) => (
        <UserItem data={book} />
      ))}
      <PaginationHandler setPage={setPage} data={pagination} />
    </div>
  );
}

export default UsersComp;
