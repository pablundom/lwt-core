import {Box, Button, List} from "@mui/material";
import React, {useState} from "react";
import {Collapse as CollapseMUI} from "@mui/material";
import {BuilderDecorator} from "../BuilderMain/BuilderDecorator.js";
import {Decorator} from "../Decorator.js";


export const CollapseBuilder = ({component, mode, ...props}) => {

    const renderContent = () => {
        const componentContent = component.children[1];
        const DecoratorComponent = (mode === 'builder') ? BuilderDecorator : Decorator;
        return <DecoratorComponent key={componentContent.id} component={componentContent}
                                   mode={mode}{...componentContent.props} />
    }

    const renderCollapseButon = () => {
        const componentContent = component.children[0];
        const DecoratorComponent = (mode === 'builder') ? BuilderDecorator : Decorator;
        return <DecoratorComponent key={componentContent.id} component={componentContent}
                                                                mode={mode}{...componentContent.props} />
    }

    return <>
        {renderCollapseButon()}
        {renderContent()}
    </>
}