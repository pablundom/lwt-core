import {addComponentsToTabById, addTab, getBaseEditorSkeleton} from "../../editor/editor.util.js";


export default function () {
    let res = getBaseEditorSkeleton();
    addTab({editor: res, properties: {label: 'Propiedades', id: 'props'}});
    let components = [
        {
            "type": "textfield",
            "key": "textfield",
            "props": {
                "label": "Etiqueta",
                "key": "label",
                "visibility": {
                    "visible": true
                },
                "events": [
                ],
            }
        },
        {
            "type": "select",
            "key": "select",
            "props": {
                "label": "Variante",
                "options": [
                    {
                        "key": "Delineada",
                        "value": "outlined",
                        "template": "{option.key}"
                    },
                    {
                        "key": "Rellena",
                        "value": "filled",
                        "template": "{option.key}"
                    },
                    {
                        "key": "Fondo vacio",
                        "value": "standard",
                        "template": "{option.key}"
                    }
                ],
                "key": "variant",
                "visibility": {
                    "visible": true
                },
            }
        }
    ]

    addComponentsToTabById({editor: res, components: components, id: 'props'});

    return res;
}