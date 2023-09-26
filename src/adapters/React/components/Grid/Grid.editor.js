import {addComponentsToTabById, addTab, buildComponent, getBaseEditorSkeleton} from "../../editor/editor.util.js";
import Grid2 from "@mui/material/Unstable_Grid2";


export default function () {
    let res = getBaseEditorSkeleton();
    addTab({editor: res, properties: {label: 'Propiedades', id: 'props'}});
    let columnsSize = {
        type: 'textfield',
        props: {
            fullWidth: true,
            label: "Numero de Columnas",
            variant: "filled",
            key: "columns",
        }

    };
    let columnsText = {
        type: 'text',
        props: {
            text: 'Definición de celdas',
            variant: 'h5'
        }
    };
    let virtualcontainer = {
        type: 'virtual_container',
        props: {
            "iterableObjectPath": "value.columnsProps",
            sx: {
              "maxHeight": '70vh',
                maxWidth: 'auto',
                overflowX: 'hidden',
                overflowY: 'auto',
                paddingRight: '15px'
            },
            template: [
                {
                    "type": "container",
                    props: {},
                    "children": [
                        {
                            "type": "textfield",
                            "props": {
                                "label": "Tamaño de Celda",
                                "variant": "filled",
                                "key": "columnsProps[0].xs",
                            }
                        }
                    ]
                },
            ]
        },
    }
    const addMoreCellsButton = {
        type:'button',
        props: {
            value: 'Añadir Celda',
            events: [
                {
                    name: 'AddCell',
                    trigger: {
                        name: 'onClickButton',
                        type: 'domEvent',
                        event: 'onClick'
                    },
                    action: {
                        mode: 'linear',
                        actions: [
                            {
                                name: 'addCellToGrid',
                                type: 'addArrayChildren',
                                scope: {
                                    array: 'value.columnsProps',
                                    element:'value.defaultColumnProp'
                                },

                            },
                        ]
                    }
                }
            ]
        }
    }

    addComponentsToTabById({editor: res, components: [columnsSize, columnsText, virtualcontainer, addMoreCellsButton], id: 'props'});

    return res;
}