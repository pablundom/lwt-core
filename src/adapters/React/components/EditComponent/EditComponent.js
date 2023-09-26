import {useStateStore} from "../../hooks/useStateStore.js";
import React, {useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {EditComponentPreview} from "./EditComponentPreview.js";
import {EditComponentEditor} from "./EditComponentEditor.js";
import {cloneDeep} from "lodash";
export const EditComponent = ({onClose, ...props}) => {
    const store = useStateStore();
    const [editorComponent, setEditorComponent] = useState()
    const {componentEditting, updateSchema, lwtInstance} = store;
    const [editorValue, setEditorValue] = useState({});
    const onConfirm = (e) => {
        const {component} = componentEditting;
        const newValue = cloneDeep(editorValue);
        if (component) {
            store.callPluginHook({hookName: 'onEditSchemaConfirm', newProps: newValue, component});
            if (component?.hooks?.onEdit) {
                component.hooks.onEdit({newProps: newValue, component, state: store});
            } else {
                component.props = {...component.props, ...newValue};
            }
            updateSchema();
        }
        onClose();
    }
    const onCancel = (e) => {
        onClose();
    }


    const onEditStoreChange = (a) => {
        const value = a;
        const newComponent = cloneDeep(componentEditting.component);
        store.callPluginHook({hookName: 'onEditSchemaConfirm', newProps: value, component: componentEditting.component});
        if (newComponent?.hooks?.onEdit) {
            newComponent.hooks.onEdit({newProps: value, component:newComponent, store});
        } else {
            newComponent.props = {...newComponent.props, ...value};
        }
        setEditorValue(value);
        setEditorComponent(newComponent);
    }
    const onClickSeeValue = () => {
        store.setProperty('jsonViewer', editorValue);
    }

    return <>
        <Grid2 container spacing={4}>
            <Grid2 xs={7}>
                <Grid2 container spacing={4}>
                    <Grid2>
                        <Typography variant="h5">Edición de Componente </Typography>
                    </Grid2>
                  <Grid2>
                      <Button variant="outlined" onClick={onClickSeeValue} >Ver Valor</Button>
                  </Grid2>
                </Grid2>
                <Box sx={{marginTop: 2}}>
                    <EditComponentEditor onEditStoreChange={onEditStoreChange}/>
                </Box>
            </Grid2>
            <Grid2 xs={5}>
                <Typography variant="h5">Previsualización</Typography>
                <Box sx={{marginTop: 2}}>
                    <EditComponentPreview lwtInstance={lwtInstance} newSchema={editorComponent} />
                </Box>
            </Grid2>
        </Grid2>
        <Grid2 container sx={{marginTop: 2}} columns={12}>
                <Grid2 xs={6}>
                    <Button variant="contained" onClick={onConfirm} sx={{marginRight: 2}}>Guardar</Button>
                </Grid2>
             <Grid2 xs={1}>
                 <Button variant="contained" onClick={onCancel} color="error">Cancelar</Button>
             </Grid2>
        </Grid2>
    </>
}