import Grid2 from "@mui/material/Unstable_Grid2";
import {Decorator} from "../Decorator.js";
import React from "react";


export const Grid = ({component, children}) => {
    const {columnsProps, containerClass, defaultColumnProp, ...props} = component.props;
    const renderColumns = () =>{
        return component.children.map((c, k) => {
            let props = columnsProps[k];
            if (!props) {
                props = component.props.defaultColumnProp;
            }
            return <Grid2 {...props} key={k} >
               <LWTReactGridCell component={component} data={c} />
            </Grid2>
        })
    }

    return (
        <Grid2 container {...props}>
            {renderColumns()}
        </Grid2>)
}

const LWTReactGridCell = ({renderContainerBuilder, component, data, ...props}) => {
    const render = () => {
        return data.map((p, k) => {
            return <Decorator  component={p}
                              children={p.children}  {...p.props}  key={`${p.id}_${k}`} />
        })
    }

    return <>
        {render()}
    </>

}