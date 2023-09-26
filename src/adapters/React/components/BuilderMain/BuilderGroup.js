import React, {useState} from "react";
import {Collapse, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import "./BuilderMain.css"
import {useDrag} from "react-dnd";
import {useStateStore} from "../../hooks/useStateStore.js";
import {BuilderComponent} from "./BuilderComponent.js";

export const BuilderGroup = ({group, filter, ...props}) => {
    const {lwtInstance} = useStateStore();
    const [open, setOpen] = useState(true);
    const renderComponentList = () => {
        const components = lwtInstance.components.filter(p => p.builder?.group === group.name)
            .filter(c => filter === '' ||
                c.builder?.name?.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
                c.key?.toLowerCase().indexOf(filter.toLowerCase()) !== -1
            );
        return <>{components.map((p, k) => <ListItem key={`${p.id}_${k}`}>
            <BuilderComponent index={k} item={p} />
        </ListItem>
        )} </>
    }
    return <><ListItemButton sx={{background: '#EEE'}} onClick={() => setOpen(!open)}>
        <ListItemText primary={group.title} />   {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
    </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
        {renderComponentList()}
            </List>
        </Collapse>
    </>
}