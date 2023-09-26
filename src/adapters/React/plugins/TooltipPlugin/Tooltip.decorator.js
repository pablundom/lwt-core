import {cloneElement} from "react";
import {Box, Tooltip} from "@mui/material";


export const TooltipDecorator = ({component, options, contains, parent, ...props}) => {
    const Container = cloneElement(contains, {...props});
    const tooltip = component.props.tooltip ?? props.tooltip;
    if (tooltip) {
        return <Tooltip {...tooltip}>
            <div>{Container}</div>
        </Tooltip>
    }

    return <>{Container}</>;
}
