import { Tsukimi_Rounded } from "next/font/google";
import Image from "next/image";
import React ,{useContext}from "react";
import Star from "react-star-ratings";
import { Button } from "./ui/button";
import { BookContainerProps } from "@/lib/utils";
import Link from "next/link";
import { CardContext} from "@/context/CartContext";
import { TProductInfo } from "@/context/CartContext";
import FormatPrice from "@/lib/FormatPrice";

function BookContainer({
  description,
  image,
  price,
  rating,
  title,
  _id,
}: BookContainerProps) {

  const {addToCard} = useContext(CardContext)
  const addCardHandler = () => {
    const objCard: TProductInfo = {
      _id: _id,
      image: image || "/book.avif",
      price: price,
      quantity: 1,
      title: title,
    };

    addToCard(objCard);
  };
  return (
    <div className="flex w-full  border border-gray-300 gap-x-4 justify-between pr-4 rounded-sm ">
      <div className="flex justify-center w-[100px] h-full items-center relative ">
        <Image src={image || "/book.avif"} alt="book image" fill />
      </div>
      <Link href={`/products/${_id}`}>
        <div className="flex flex-col py-2   ">
          <div className="flex flex-col w-full  my-auto gap-y-2">
            <h1 className="font-bold text-ellipsis overflow-hidden whitespace-nowrap ">
              {title}
            </h1>
            <div className="flex  items-center gap-x-2  w-full ">
                <Star
                  rating={rating}
                  starDimension="20px"
                  starSpacing="2px"
                  starRatedColor="yellow"
                />
              {rating}
            </div>
            <p className="text-muted-foreground overflow-hidden w-full h-[100px]">
              {description.substring(0, 50) + "..."}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex flex-col  h-full">
        <div className="flex-col w-full h-[80%] my-auto ">
          <h1 className="font-bold mb-3">{FormatPrice(price.value , price.currency )}</h1>
          <p className="text-green-400 mb-3">Free Shopping</p>
          <Button className="text-white bg-blue-500 hover:bg-blue-300" onClick={()=>{addCardHandler()}}>
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookContainer;
