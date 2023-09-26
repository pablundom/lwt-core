import {addComponentsToTabById, addTab, getBaseEditorSkeleton} from "../../editor/editor.util.js";


export default function () {
    let res = getBaseEditorSkeleton();
    addTab({editor: res, properties: {label: 'Propiedades', id: 'props'}});
    const variant =  {
        "type": "select",
        "props": {
            "label": "Formato",
            value: 'p',
            key: "variant",
            "options": [
                {
                    "key": "span",
                    "value": "span",
                    "template": "Párrafo"
                },
                {
                    "key": "h1",
                    "value": "h1",
                    "template": "<h1>Encabezado 1</h1>"
                },
                {
                    "key": "h2",
                    "value": "h2",
                    "template": "<h2>Encabezado 2</h2>"
                },
                {
                    "key": "h3",
                    "value": "h3",
                    "template": "<h3>Encabezado 3</h3>"
                },
                {
                    "key": "h4",
                    "value": "h4",
                    "template": "<h4>Encabezado 4</h4>"
                },
                {
                    "key": "h5",
                    "value": "h5",
                    "template": "<h5>Encabezado 5</h5>"
                },
                {
                    "key": "h6",
                    "value": "h6",
                    "template": "<h6>Encabezado 6</h6>"
                }
            ],
        }
    };
    const textfield = {
        type: 'textfield',
        props: {
            key:'text',
            label: 'Texto',
            value: '',
            multiline: true,
            minRows: 3,
            fullWidth: true
        }
    }
    addComponentsToTabById({editor: res, components: [variant, textfield], id: 'props'});

    return res;
}