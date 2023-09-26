import {Box, Button, Icon, Typography} from "@mui/material";
import JsxParser from "react-jsx-parser";
import React from "react";


export const Text = ({component, ...props}) => {
    return <Typography {...props}>   <JsxParser
        bindings={{}}
        components={{ Box, Button, Icon, Typography }}
        jsx={`${props.text}`}
    /></Typography>
}