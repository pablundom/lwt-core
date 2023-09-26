import {InputAdornment, TextField} from "@mui/material";
import {useEffect} from "react";


export const Textfield = ({component, type, ...props}) => {
    const startAdornment = () => {
        if (type === 'color') {
            return <InputAdornment position="start">
                <input style={{width: '25px'}} value={props.value} onInput={props.onInput} type="color"/>
            </InputAdornment>
        }
        return null;
    }
    return <TextField InputProps={{startAdornment: startAdornment(), style: props.input_sx ?? {}}} InputLabelProps={{style: props.label_sx ?? {}}} {...props} />
}