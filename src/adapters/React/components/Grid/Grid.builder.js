import Grid2 from "@mui/material/Unstable_Grid2";
import React, {useRef} from "react";
import {useDropController} from "../../hooks/useDropController.js";
import {BuilderDecorator} from "../BuilderMain/BuilderDecorator.js";
import {BuilderEmptyContainer} from "../Container/BuilderEmptyContainer.js";
import {Box, Button, IconButton, Icon} from "@mui/material";
import {useStateStore} from "../../hooks/useStateStore.js";
import "./Grid.css"

export const GridBuilder = ({component,  children}) => {
    const state = useStateStore();
    const {columnsProps, containerClass, defaultColumnProp, ...props} = component.props;

    const onAddNewCell = () => {
        component.hooks.onAddNewCell({component, state})
    }
    const onRemoveCell = (index) => {
        component.hooks.onRemoveCell({index, component, state})
    }
    const renderColumns = () => {
        return <> {children.map((c, k) => {
            let props = columnsProps[k];
            if (!props) {
                props = component.props.defaultColumnProp;
            }
            return <Grid2 {...props} key={k}>
                <ReactGridCellBuilder index={k} cellIndex={k} component={component} onRemoveCell={onRemoveCell}
                                         data={c}/>
            </Grid2>
        })}
            <Grid2 {...props} key={'aux'}>
                <Box><Button onClick={onAddNewCell} variant="contained"> Añadir otra Celda</Button> </Box>
            </Grid2>
        </>
    }


    return (
        <Grid2 columnSpacing={3} container {...props}
               style={{}}>
            {renderColumns()}
        </Grid2>)
}

const ReactGridCellBuilder = ({component, data, cellIndex, onRemoveCell, ...props}) => {
    const ref = useRef();
    const {drop, isOverCurrent} = useDropController({ref, index: props.index, component});
    drop(ref);
    const handleRemoveCell = () => {
        onRemoveCell(cellIndex);
    }
    const getBoxStyle = () => {
        if (isOverCurrent === false || data.length === 0) {
            return {p: 3}
        }
        return {backgroundColor: '#dfffdf', p: 3}
    }
    const render = () => {
        if (data.length === 0) {
            return <Box><BuilderEmptyContainer /></Box>
        }
        return data.map((p, k) => {
            return <Box key={k}  sx={{backgroundColor: 'white'}}><BuilderDecorator key={p.id} component={p}
                                     children={p.children}  {...p.props} /></Box>
        })
    }

    return <>
        <Box ref={ref} className="cell" sx={getBoxStyle()}>
            {render()}
            <Box className="removeCellButton">
            <IconButton onClick={handleRemoveCell}
                        ><Icon color="red">close</Icon></IconButton>
            </Box>
        </Box>
    </>

}