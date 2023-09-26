import {addComponentsToTabById, addTab} from "../../editor/editor.util.js";
import Grid2 from "@mui/material/Unstable_Grid2";


export default ({editSchema, state, component}) => {
    addTab({editor: editSchema, properties: {label: 'Visibilidad', id: 'visibility'}});
    const visibilityCheckbox = {
        "type": "checkbox",
        "props": {
            "label": "Visibilidad por defecto",
            "key": "visibility.visible",
            "defaultValue": true,
            "visibility": {
                "visible": true
            }
        },
    };
    const addVisibilityCondition = {
        "type": "text",
        "props": {
            variant: 'h6',
            text: "Condición lógica especial de visibilidad",
        },
    };
    const showOrHideText = {
        "type": "textfield",
        "props": {
            placeholder: "Condición lógica",
            label: 'Condición lógica',
            variant:'outlined',
            key: 'visibility.condition'
        },
    };

    addComponentsToTabById({
        editor: editSchema,
        components: [visibilityCheckbox, addVisibilityCondition, showOrHideText],
        id: 'visibility'
    });

    return editSchema;
}