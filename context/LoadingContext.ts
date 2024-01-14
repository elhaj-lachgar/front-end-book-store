
import { Dispatch, SetStateAction, createContext } from "react";


interface TLoadingContext {
    Loading: boolean;
    setLoading : Dispatch<SetStateAction<boolean>>;
};


const initLoadingContext : TLoadingContext = {
    Loading : false,
    setLoading : () => {},
}


export const LaodingContext = createContext<TLoadingContext>(initLoadingContext);