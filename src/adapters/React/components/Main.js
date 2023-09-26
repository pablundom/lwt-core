import {Decorator} from "./Decorator.js";
import {useStateStore} from "../hooks/useStateStore.js";
import {useEffect} from "react";
import {BuilderDecorator} from "./BuilderMain/BuilderDecorator.js";

export const Main = ({mode, ...props}) => {
    const {schema} = useStateStore(state => state);


    return  <><BuilderDecorator component={schema} mode={mode} children={schema.children ?? []}  {...schema?.props}  /></>
}