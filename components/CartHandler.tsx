"use client";
import React, { useContext} from "react";
import { CardContext } from "@/context/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CardItemMobile from "./CardItemMobile";

function CartHandler() {
  const { card } = useContext(CardContext);
  return (
    <div className="flex flex-col md:flex-row gap-x-10 gap-y-5">
      <div className=" hidden lg:flex flex-col p-3 border border-gray-400 lg:w-[65%] gap-y-3 w-full">
        {card.cardItems.map((book) => (
          <CartItem
            _id={book._id}
            image={book.image}
            price={book.price}
            quantity={book.quantity}
            title={book.title}
            key={book._id}
          />
        ))}
      </div>
      <div className="flex lg:hidden flex-wrap p-3 border border-gray-400 lg:w-[65%] gap-3 w-full justify-center">
      {card.cardItems.map((book) => (
          <CardItemMobile
            _id={book._id}
            image={book.image}
            price={book.price}
            quantity={book.quantity}
            title={book.title}
            key={book._id}
          />
        ))}
      </div>
      <Checkout
        currency={"EUR"}
        totalePrice={card.totlePrice}
        key={card.totlePrice}
      />
    </div>
  );
}

export default CartHandler;
