"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Star from "react-star-ratings";
import { Button } from "./ui/button";
import { useContext } from "react";
import { CardContext, TProductInfo } from "@/context/CartContext";
import FormatPrice from "@/lib/FormatPrice";
import ReviewItem from "./ReviewItem";
import GetUserLastVersion from "@/integration/last-v-user";
import { TUser } from "@/integration/sign";

import CreateReviewModule from "./CreateReviewModule";

function ProductDetails({ data }: { data: any }) {
  const { addToCard } = useContext(CardContext);
  let [ user , setUser ] = useState<null|TUser>(null);
  const addCardHandler = () => {
    const objCard: TProductInfo = {
      _id: data.data._id,
      image: data.data.image,
      price: data.data.price,
      quantity: 1,
      title: data.data.title,
    };

    addToCard(objCard);
  };

  useEffect(()=>{
    async function fetching() {
      const v = await GetUserLastVersion();
      // @ts-ignore;
      setUser(v)
    }
    fetching ()
  },[])



  return (
    <div className="flex flex-col w-full pb-4">
      <div className="w-full h-full flex flex-wrap px-3 py-5 lg:gap-x-2 gap-y-5 justify-center ">
        <div className="w-full lg:w-[40%] flex lg:justify-center  flex-col gap-y-3">
          <div className=" w-[300px] h-[300px] lg:w-[80%] lg:h-[80%] border border-gray-400 relative lg:mx-auto ">
            <Image src={data.data.image} alt="image of product" fill />
          </div>
        </div>
        <div className="w-full lg:w-[45%] flex flex-col gap-y-4">
          <h1 className="font-bold text-2xl lg:text-4xl">{data.data.title}</h1>
          <div className="flex gap-x-5 items-center">
            <div className="flex gap-x-2 items-cente ">
              <Star
                rating={data.data.rating}
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="yellow"
              />
              <span className="text-yellow-400">{data.data.rating}</span>
            </div>
            <span className="text-green-300">Verified</span>
          </div>
          <h2 className="font-bold">
            {FormatPrice(data.data.price.value, data.data.price.currency)}
          </h2>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-400 w-[100px]"
            onClick={addCardHandler}
          >
            Add to Card
          </Button>
          <p className="text-muted-foreground">{data.data.description}</p>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-5 items-center">
              <span className="font-bold w-[100px]">Stock :</span>
              <span className="text-green-300">IsStoked</span>
            </div>
            <div className="flex gap-x-5 items-center">
              <span className="font-bold w-[100px]">Category :</span>
              <span className="text-muted-foreground">
                {data.data.category.name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-50 flex flex-col h-full lg:px-5 px-2 py-4 rounded-md gap-y-6">
        <div className="flex w-full justify-between items-center">
        <h1 className="text-muted-foreground font-semibold">Reviews</h1>
        {
          user?.ReviewBook?.includes(data.data._id)
          ?
          <CreateReviewModule id={data.data._id}/>
          :
          null
        }
        </div>
        <div className="flex flex-col gap-y-4">
          {data?.data?.reviews?.map((ele: any) => {
            return (
              <ReviewItem
                userId={ele.user?._id}
                content={ele.content}
                id={ele._id}
                rating={ele.rating}
                image={ele.user?.profile}
                name={ele.user.name}
                key={ele._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
