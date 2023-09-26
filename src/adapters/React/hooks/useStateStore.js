import {useContext} from "react";
import {StoreContext} from "../context/StoreContext.js";
import {useStore} from "zustand";

export const useStateStore = (selector) => {
    let context  = useContext(StoreContext);

    return useStore(context, selector);
}