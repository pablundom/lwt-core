import {
    Box,
} from "@mui/material";
import React, {useCallback, useMemo, useRef} from "react";
import {useStateStore} from "../../hooks/useStateStore.js";
import {useDropController} from "../../hooks/useDropController.js";
import {BuilderEmptyContainer} from "../Container/BuilderEmptyContainer.js";
import {BuilderDecorator} from "../BuilderMain/BuilderDecorator.js";


export const ModificableListBuilder = ({component, renderChildren, renderContainerBuilder, children, ...props}) => {
    const ref = useRef();
    const store = useStateStore();
    const {drop} = useDropController({component, ref});
    drop(ref);
    const {mode} = store;
    const render = useCallback(() => {
        const componentTemplate = component.children[0];
        if (!componentTemplate) {
            return <div ref={ref}><BuilderEmptyContainer /></div>
        }

        return <div ref={ref}><BuilderDecorator component={componentTemplate} mode={mode} {...componentTemplate.props} /></div>

    }, [component]);
    return <>{render()}</>
}