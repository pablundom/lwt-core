import React, {useState} from "react";
import {StoreContext} from "../../context/StoreContext.js";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Grid2 from "@mui/material/Unstable_Grid2";
import {BuilderComponentList} from "./BuilderComponentList.js";
import {Box, Button, Typography} from "@mui/material";
import {Main} from "../Main.js";
import {EditComponentContainer} from "../EditComponent/EditComponentContainer.js";
import {JsonModal} from "../JsonModal/JsonModal.js";
import {useStateStore} from "../../hooks/useStateStore.js";
import {BuilderNavBar} from "./BuilderNavBar.js";


export const Builder =  ({schema, store, ...props}) => {

    return <React.Fragment>
        <StoreContext.Provider value={store}>
            <DndProvider backend={HTML5Backend}>
                <Grid2 container={true} columns={20}>
                    <Grid2 xs={3}>
                        <BuilderComponentList {...schema?.props}  />
                    </Grid2>
                    <Grid2 xs={17}>
                        <BuilderNavBar />
                        <Main mode='builder' {...schema?.props}  />
                    </Grid2>
                </Grid2>
                <Box sx={{p: 2}}>
                    <Typography variant="h4">Previsualización</Typography>
                    <Main mode="full"  {...schema?.props}  />
                </Box>
                <EditComponentContainer />
            </DndProvider>
        </StoreContext.Provider>
    </React.Fragment>
}