import {Box, Button, List} from "@mui/material";
import React, {useState} from "react";
import {Collapse as CollapseMUI} from "@mui/material";
import {BuilderDecorator} from "../BuilderMain/BuilderDecorator.js";
import {Decorator} from "../Decorator.js";
import {useStateStore} from "../../hooks/useStateStore.js";
import {set} from "lodash";


export const Collapse = ({component, mode, ...props}) => {

    const [opened, setOpened] = useState(props.openedDefault ?? false);
    const state = useStateStore();
    const renderContent = () => {
        const componentContent = component.children[1];
        const DecoratorComponent = (mode === 'builder') ? BuilderDecorator : Decorator;
            return <DecoratorComponent  component={componentContent} mode={mode}{...componentContent.props} key={componentContent.id} />
    }

    const handledOpened = () => {
        setOpened(!opened);
        set(state, `state.collapse.${component.id}`, !opened);
        state.updateSchema();
    }

    const renderCollapseButon = () => {
        const componentContent = component.children[0];
        const DecoratorComponent = (mode === 'builder') ? BuilderDecorator : Decorator;
        const boxStyle = {cursor:'pointer'};
        return <Box sx={boxStyle} onClick={handledOpened}><DecoratorComponent key={componentContent.id} component={componentContent} mode={mode}{...componentContent.props} /></Box>
    }

    return <>
        {renderCollapseButon()}
        <CollapseMUI in={opened} timeout="auto" unmountOnExit>
            {renderContent()}
        </CollapseMUI>
    </>
}