import {Button as MuiButton, Icon, IconButton} from "@mui/material"
import {useEffect, useRef} from "react";


export const Button = ({component, iconButton,  startIcon, endIcon, ...props}) => {
    const getStartIcon = () => {
        if (component.props.startIcon) {
            return <Icon>{component.props.startIcon}</Icon>
        }
        return null;
    }
    const getEndIcon = () => {
        if (component.props.endIcon) {
            return <Icon>{component.props.endIcon}</Icon>
        }
        return null;
    }

    if (iconButton === true) {
        return <IconButton {...props}><Icon>{component.props.value}</Icon></IconButton>
    }

    return <MuiButton startIcon={getStartIcon()} endIcon={getEndIcon()} {...props}>  {component.props.value}</MuiButton>
}