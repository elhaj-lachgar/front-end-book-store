import { createContext } from "react";

interface TCategoryContext {
    category: string [],
    fetcher: (categorys:string[]) => void;
}

const initCategory : TCategoryContext = {
    category : [],
    fetcher: ([]) =>{console.log("initCategory")}
}


export const CategoryContext = createContext<TCategoryContext>(initCategory);