"use client";
import React, { useState, useContext, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { BookContext, TBook } from "@/context/BookContext";
import GetCategorys from "@/integration/get-categorys";
import Star from "react-star-ratings";
import {
  TApiBooks,
  TApiCategorys,
  TestBookApi,
  initCategorys,
} from "@/lib/utils";
import GetPriceFilter from "@/integration/get-price-filter";
import LaoderButton from "./LaoderButton";

function FilterComponent() {
  let [clicked, setClicked] = useState("");
  let [max, setMax] = useState<number | null>(null);
  let [min, setMin] = useState<number | undefined>(undefined);
  let [star, setstar] = useState("");
  let [category, setCategory] = useState("");
  const { changedBooks, books } = useContext(BookContext);
  let [categorys, setCategorys] = useState<null | TApiCategorys>(null);
  let [loading, setLoading] = useState(false);

  const handlerFilter = () => {
    let list;
    if (category) {
      list = books.filter((book) => book.category == category);
    }
    if (star) {
      list = books.filter((book) => {
        return book.rating >= parseFloat(star);
      });
    }

    if (!list) return;

    changedBooks(list);
  };

  useEffect(() => {
    handlerFilter();
  }, [star, category]);

  async function FetchCategorys() {
    let data: TApiCategorys | null = null;
    try {
      const result = await GetCategorys();
      if (typeof result === typeof initCategorys) {
        // @ts-ignore
        data = result;
      }
    } catch (err: any) {
      console.log("err", err.message);
    }
    setCategorys(data);
  }
  const handlerRanges = async () => {
    if (!max) return;
    let data: null | TApiBooks = null;
    try {
      const result = await GetPriceFilter(max, min);
      if (typeof result === typeof TestBookApi) {
        // @ts-ignore
        data = result;
      }
    } catch (err: any) {
      console.log("err", err.message);
    }
    if (!data) return;
    let validData: TBook[] = data.data?.map((ele) => {
      return {
        _id: ele._id,
        category: ele.category,
        description: ele.description,
        price: ele.price,
        rating: ele.rating,
        count_rating: ele.count_rating,
        title: ele.title,
        image: ele.image,
      };
    });
    if (validData.length == 0) {
      setLoading(false);
      return;
    }

    changedBooks(validData);
    setLoading(false);
  };
  useEffect(() => {
    FetchCategorys();
  }, []);

  return (
    <div className="  hidden lg:flex flex-wrap  w-[0%] lg:w-[20%] sticky top-[100px] border border-gray-300 h-[600px] gap-y-5 rounded-sm ">
      <div className="px-3 py-4 w-full flex flex-wrap">
        <h1 className="lg:text-xl w-full font-bold">Price($)</h1>
        <div className="flex gap-x-2 items-center w-full justify-center">
          <Input
            type="number"
            className="w-[30%]"
            placeholder="Min"
            onChange={(e) => setMin(parseFloat(e.currentTarget.value))}
          />
          <Input
            type="number"
            className="w-[30%]"
            placeholder="Max"
            onChange={(e) => setMax(parseFloat(e.currentTarget.value))}
          />
          {loading ? (
            <LaoderButton value="1111" />
          ) : (
            <Button
              className="bg-blue-500 text-white"
              onClick={() => {
                setLoading(true);
                handlerRanges();
              }}
            >
              Go
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <div className="px-3 py-4 w-full flex flex-wrap gap-y-3">
        <h1 className="lg:text-xl w-full font-bold">Category</h1>
        {categorys ? (
          <>
            {categorys.data.map((category) => (
              <div className="flex  gap-x-2  w-full items-center">
                <Checkbox
                  id={category._id}
                  onClick={() => {
                    setClicked(category._id);
                    setCategory(category._id);
                  }}
                  checked={clicked == category._id}
                />
                <label
                  htmlFor={category._id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <Separator />
      <div className="px-3 mb-5 w-full flex flex-wrap gap-y-1">
        <h1 className="lg:text-xl w-full font-bold">Rating</h1>
        {[2, 3, 4, 5].map((ele) => (
          <div className=" flex gap-x-2 items-center">
            <Checkbox
              id={ele.toString()}
              onClick={(e) => {
                setstar(ele.toString());
              }}
              checked={ele.toString() == star}
            />
            <label
              htmlFor={ele.toString()}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Star
                rating={ele}
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="yellow"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterComponent;
