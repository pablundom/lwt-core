import {useContext} from "react";
import {StoreContext} from "../context/StoreContext.js";
import {useStore} from "zustand";

export const useStoreChanges = (store, selector) => {
    if (!store) {
        return {};
    }

    return useStore(store, selector);
}