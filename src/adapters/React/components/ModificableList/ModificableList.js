import {
    Box, Button, Icon, IconButton,
} from "@mui/material";
import React, {useCallback} from "react";
import {Decorator} from "../Decorator.js";
import {useStateStore} from "../../hooks/useStateStore.js";
import {cloneDeep} from "lodash";


export const ModificableList = ({component, children, ...props}) => {
    const store = useStateStore();
    const {updateSchema, lwtInstance, value} = store;

    const onClick = () => {
        component.hooks?.onNewElement && component.hooks?.onNewElement({component, store, lwtInstance, value});
        updateSchema();
    }
    const onRemoveCell = (data) => {
        component.hooks?.onRemoveComponent && component.hooks?.onRemoveComponent({component, data, store, lwtInstance, value});
        updateSchema();
    }
    const renderChildren = () => {
        return component.children.map((c, k) => {
            return <Box sx={{position:'relative'}} key={k}>
                <IconButton sx={{position:'absolute', right: 0, top: 0, zIndex: 2}} onClick={() => onRemoveCell(c)}>
                    <Icon>close</Icon></IconButton>
                <Decorator key={c.id} parent={component}
                              component={component.children[k]}
                              children={c.children} {...c.props} />
                </Box>
        })
    }


    return <Box>
        {renderChildren()}
        {component.props.addNewElementsEnabled ? <Button sx={{marginTop: '10px', marginBottom:'10px'}}  onClick={onClick}>
            Añadir otro elemento
        </Button> : null}
    </Box>
}