import {useStateStore} from "../../hooks/useStateStore.js";
import React, {useEffect, useRef, useState} from "react";
import {get, set} from "lodash";
import {useDropController} from "../../hooks/useDropController.js";
import {Box, Button, Icon, IconButton} from "@mui/material";
import {Decorator} from "../Decorator.js";


export const VirtualContainer = ({component, iterableObjectPath, ...props}) => {
    const state = useStateStore();
    const {updateSchema} = state;
    const ref = useRef();
    const {drop} = useDropController({component, ref});
    const objectVar = get({component, ...state}, component.props.iterableObjectPath);
    const [childrens, setChildrens] = useState([]);
    useEffect(() => {
        if (component.hooks.onGetVirtualComponents) {
            const newChildrens = component.hooks.onGetVirtualComponents({component, state});
            setChildrens(newChildrens)
        }
    }, [Object.values(objectVar ?? []).length]);
    drop(ref);
    const WrapperComponent = component.props.wrapper?.container?.class ?? Box;
    const WrapperChildren = component.props.wrapper?.children?.class ?? Box;
    const wrapperContainerProps = component.props.wrapper?.container?.props ?? {};
    const wrappedChildrenProps = component.props.wrapper?.children?.props ?? {};

    const onRemoveCell = (index) => {
        if (component.hooks.onRemoveCell) {
            component.hooks.onRemoveCell({component, state, index});
        }
    }
    const onAddElement = () => {
        if (component.hooks.onNewElement) {
            component.hooks.onNewElement({component, state, data: {}});
        }
    }
    return <><WrapperComponent ref={ref} {...props} {...wrapperContainerProps}>
        {childrens.map((c,k) =>
        <WrapperChildren key={k} {...wrappedChildrenProps}>{c.map((c1,k1) =>    <Box key={k1} sx={{position: 'relative'}}>
            <IconButton sx={{position:'absolute', right: 0, top: 0, zIndex: 2}} onClick={() => onRemoveCell(k)}>
                <Icon>close</Icon></IconButton>
            <Decorator component={c1} {...c1.props} />
        </Box>)}</WrapperChildren>)}
    </WrapperComponent>
        {props.button_add_element === 'true' ? <Button onClick={onAddElement}>Añadir otro elemento</Button> : null}
    </>;
}