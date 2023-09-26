import React from "react";
import {Icon, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import "./BuilderMain.css"
import {useDrag} from "react-dnd";
import {useStateStore} from "../../hooks/useStateStore.js";

export const BuilderComponent = ({item, index, moveItem, ...props}) => {
    const {schema} = useStateStore();

    const [collected, drag] = useDrag(() => {
        return {
            type: item.builder.dragGroup ?? 'component-builder',
            item: {component: item, index}
        }
    }, [schema, item]);
    return <ListItemButton ref={drag}>
            <ListItemIcon><Icon>{item.builder?.icon}</Icon></ListItemIcon>
            <ListItemText primary={item.builder?.name}>{item.builder?.name}</ListItemText>
        </ListItemButton>
}