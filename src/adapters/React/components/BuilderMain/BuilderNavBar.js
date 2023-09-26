import {JsonModal} from "../JsonModal/JsonModal.js";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";
import React from "react";
import {useStateStore} from "../../hooks/useStateStore.js";


export const BuilderNavBar = ({...props}) => {
    const {setProperty, lwtInstance, value, jsonViewer} = useStateStore();
    const onClickSeeJson = () => {
        setProperty('jsonViewer', lwtInstance.getOutputJsonSchema());
    }
    const onClickSeeValue = () => {
        setProperty('jsonViewer', value);
    }

    return <><JsonModal open={jsonViewer} onClose={(e =>  setProperty('jsonViewer', null))} />
    <Grid2 sx={{m: 2}} columns={34} container spacing={2}>
        <Grid2 xs={2}>
            <Button variant="outlined" onClick={onClickSeeJson}>Ver JSON</Button>
        </Grid2>
        <Grid2 xs={2}>
            <Button variant="outlined" onClick={onClickSeeValue}>Ver Valor</Button>
        </Grid2>
    </Grid2>
        </>
}