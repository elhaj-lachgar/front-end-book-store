import { TPagination } from "@/context/BookContext";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BookContainerProps {
  _id: string;
  title: string;
  image?: string;
  description: string;
  rating: number;
  price: {
    currency : "USD" | "EUR" | "MAD",
    value : number
  };
}

export const header = {
  "Content-Type": "application/json",
};

export type TError = {
  stack: string;
  state: number;
  err: string;
};

export type TCategory = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TApiBooks = {
  data: [
    {
      price: {
        currency: "USD" | "EUR" | "MAD",
        value: number;
      };
      _id: string;
      title: string;
      description: string;
      image: string;
      rating:number;
      category: string ;
      author: string;
      updatedAt: string;
      __v: number;
      count_rating:number;
    }
  ];
  pagination: TPagination
};

export const TestError: TError = {
  err: "TestError",
  stack: "TestError",
  state: 200,
};

export const TestBookApi: TApiBooks = {
  data: [
    {
      __v: 1,
      _id: "1223",
      author: "author",
      category: "string",
      description: "description",
      image: "image",
      rating : 5,
      price: {
        currency: "USD",
        value: 100,
      },
      title: "title",
      updatedAt: "updatedAt",
      count_rating : 0,
    },
  ],
  pagination: {
    countPage: 5,
    nextPage: 3,
    perPage: 1,
  },
};

export type TApiCategorys = {
  data : TCategory[],
  pagination: {
    countPage: number;
    perPage?: number;
    nextPage?: number;
  };
}
export const initCategorys : TApiCategorys = {
  data : [
    {
      __v: 1,
      _id: "id",
      createdAt: "created",
      name: "name",
      updatedAt: "updated",
    }
  ],
  pagination : TestBookApi.pagination,
}