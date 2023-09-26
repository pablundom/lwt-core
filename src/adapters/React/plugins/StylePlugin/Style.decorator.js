import {cloneElement, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useStateStore} from "../../hooks/useStateStore.js";


export const StyleDecorator = ({component, options, contains, parent, ...props}) => {
    const [containerSx, setContainerSx] = useState({});
    const [extraSx, setExtraSx] = useState({});
    useEffect(() => {
        if (props.styles) {
            setContainerSx(props.styles?.box ?? {});
            for (let i in props.styles) {
                if (i === 'box') {
                    continue;
                }
                extraSx[`${i}_sx`] = props.styles[i];
            }
            setExtraSx(extraSx);

        }
    }, [props.styles])
    return <Box sx={containerSx}>{cloneElement(contains, {...props, ...extraSx})}</Box>
}
