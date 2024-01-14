import { createContext } from "react";

export type TProductInfo = {
    _id : string ,
    title : string ,
    image : string , 
    price : {
        value : number , 
        currency : "USD" | "EUR" | "MAD",
    },
    quantity :number
};

export type TCard = TProductInfo[] | [];

interface ContextProps {
  card: {
    totlePrice: number;
    cardItems: TCard;
  };
  addToCard: (product: TProductInfo) => void;
  setQuantity : (vl : number , id : string) => void;
  deleteToCard : (id:string) => void;
  reload : () => void;
}

const initCartValue: ContextProps = {
  card: {
    totlePrice: 0,
    cardItems: [],
  },
  addToCard() {
    console.log(this.card);
  },
  setQuantity(vl , id) {
    console.log(vl)
  },
  deleteToCard(id){
    console.log(id)
  },
  reload : ()=>{} 
};

export const CardContext = createContext<ContextProps>(initCartValue);
