"use client";
import React, { useEffect, useState } from "react";
import { CardContext, TCard, TProductInfo } from "./CartContext";
import { TUser } from "@/integration/sign";
import AddToCard from "@/integration/add-to-card";
import { useToast } from "@/components/ui/use-toast";
import HandleQuantity from "@/integration/set-quantity";
import DeleteFromCard from "@/integration/delete-item-card";
type TCardProps = {
  cardItems: TCard;
  totlePrice: number;
};

function CartContextProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  let [card, setCard] = useState<TCardProps>({
    totlePrice: 0,
    cardItems: [],
  });
  const reload = ()=>{setCard(card)}
  const addToCard = async (data: TProductInfo) => {
    const element = card.cardItems.find((item) => item._id == data._id);

    // @ts-ignore
    const user: TUser = JSON.parse(window.localStorage.getItem("user"));
    if (user?.card) {
      // requeste
      const res = await AddToCard(data._id, data.quantity);
      if (res?._id) {
        toast({
          description: "add to card seccuffl",
          variant: "default",
          className: "bg-green-500 text-white",
          duration: 2000,
        });
      }
      // and set card by requiste
      else {
        toast({
          variant: "destructive",
          description: "same thing wrong",
          duration : 2000
        });
      }
    }

    if (!element) {
      const totlePrice = card.totlePrice + data.price.value;

      const New_card: TCardProps = {
        totlePrice: totlePrice,
        cardItems: [...card.cardItems, data],
      };

      setCard({
        totlePrice: totlePrice,
        cardItems: [...card.cardItems, data],
      });

      window.localStorage.setItem("card", JSON.stringify(New_card));
    } else {
      const totlePrice = element.price.value + card.totlePrice;

      let newCardItems: TCard = card.cardItems.map((cardItem) => {
        return cardItem._id === data._id
          ? {
              quantity: cardItem.quantity + 1,
              _id: cardItem._id,
              price: cardItem.price,
              title: cardItem.title,
              image: cardItem.image,
            }
          : cardItem;
      });

      const New_card: TCardProps = {
        totlePrice: totlePrice,
        cardItems: newCardItems,
      };

      setCard({
        totlePrice: totlePrice,
        cardItems: newCardItems,
      });
      window.localStorage.setItem("card", JSON.stringify(New_card));
    }
  };

  const setQuantity = async (vl: number, id: string) => {
    // @ts-ignore
    const user: TUser = JSON.parse(window.localStorage.getItem("user"));
    if (user?.card) {
      let choise: "increment" | "decrement" =
        vl == 1 ? "increment" : "decrement";
      const res = await HandleQuantity(id, choise);

      if (res?._id) {
        toast({
          description: `${choise} success`,
          variant: "default",
          className: "bg-green-500 text-white",
          duration: 2000,
        });
      }
      // and set card by requiste
      else {
        toast({
          variant: "destructive",
          description: "same thing wrong",
          duration : 2000,
        });
        return;
      }
    }

    const index = card.cardItems.findIndex((ele) => {
      return ele._id == id;
    });
    if (index <= -1) return;
    else if (card.cardItems[index].quantity <= 1 && vl < 0) return;
    else {
      const totlePrice =
        card.totlePrice + card.cardItems[index].price.value * vl;

      const NewCard = card.cardItems.map((book) => {
        return book._id == id
          ? {
              quantity: book.quantity + vl,
              _id: book._id,
              price: book.price,
              title: book.title,
              image: book.image,
            }
          : book;
      });
      setCard({
        totlePrice: totlePrice,
        cardItems: NewCard,
      });

      const preCard: TCardProps = {
        cardItems: NewCard,
        totlePrice: totlePrice,
      };
      window.localStorage.setItem("card", JSON.stringify(preCard));
    }
  };

  const deleteToCard = async (id: string) => {
    // @ts-ignore
    const user: TUser = JSON.parse(window.localStorage.getItem("user"));
    if (user?.card) {
      const res = await DeleteFromCard(id);
      if (res?._id) {
        toast({
          description: `delete success`,
          variant: "default",
          className: "bg-green-500 text-white",
          duration: 2000,
        });
      } else {
        toast({
          variant: "destructive",
          description: "same thing wrong",
          duration : 2000
        });
        return;
      }
    }
    const index = card.cardItems.findIndex((ele) => ele._id == id);
    if (index <= -1) return;
    let arr = card.cardItems.filter((ele) => ele._id != id);
    let TotalePrice =
      card.totlePrice -
      card.cardItems[index].price.value * card.cardItems[index].quantity;
    setCard({
      totlePrice: TotalePrice,
      cardItems: arr,
    });
    const newCard : TCardProps = {
      cardItems:arr,
      totlePrice : TotalePrice,
    }
    window.localStorage.setItem("card", JSON.stringify(newCard));
  };
  useEffect(() => {
    if (!window.localStorage.getItem("card")) return;

    const new_Card: TCardProps = JSON.parse(
      //@ts-ignore
      window.localStorage.getItem("card")
    );
    setCard(new_Card);
  }, []);

  return (
    <CardContext.Provider
      value={{ card, addToCard, setQuantity, deleteToCard , reload }}
    >
      {children}
    </CardContext.Provider>
  );
}

export default CartContextProvider;
