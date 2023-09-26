import {useStateStore} from "../../hooks/useStateStore.js";
import {useEffect, useRef, useState} from "react";
import {get, merge} from "lodash";
import {BuilderEmptyContainer} from "../Container/BuilderEmptyContainer.js";
import {useDropController} from "../../hooks/useDropController.js";
import {Box} from "@mui/material";
import {BuilderDecorator} from "../BuilderMain/BuilderDecorator.js";


export const VirtualcontainerBuilder = ({component, ...props}) => {
    const state = useStateStore();
    const ref = useRef();
    const {template} = component.props;
    const {drop, isOverCurrent} = useDropController({component, ref});
    let objectVar = get({component, ...state}, component.props.iterableObjectPath);
    const [childrens, setChildrens] = useState([]);
    useEffect(() => {
        if (component.hooks.onGetVirtualComponents) {
            const newChildrens = component.hooks.onGetVirtualComponents({component, state});
            setChildrens(newChildrens)
        }
    }, [Object.values(objectVar ?? {}).length]);
    const getBoxStyle = () => {
        if (isOverCurrent === false || template.length === 0) {
            return {p: 3}
        }
        return {backgroundColor: '#dfffdf', p: 3}
    }
    const render = () => {
        if (template.length === 0) {
            return <BuilderEmptyContainer  />
        }

        return <Box  sx={{backgroundColor: 'white'}}>{template.map(c => <BuilderDecorator component={c} children={c.children} {...c.props} />)}</Box>
    }
    drop(ref);

    return <Box ref={ref} sx={getBoxStyle()}>{render()}</Box>;
}