import {addComponentsToTabById, addTab, buildComponent, getBaseEditorSkeleton} from "../../editor/editor.util.js";


export default function () {
    let res = getBaseEditorSkeleton();
    addTab({editor: res, properties: {label: 'Propiedades', id: 'props'}});
    const label = {
        type: 'textfield',
        props: {
            key:'label',
            label: 'Etiqueta',
            value: '',
        }
    };

    addComponentsToTabById({editor: res, components: [label], id: 'props'});
    let gridPropsOptions = {
        spacing: 2,
        columnsProps: [{
            xs: 4
        },
            {
                xs: 4
            },
            {
                xs: 4
            },
        ]
    };
    let options =  {
        type: 'modificable_list',
        props: {
            "arrayVar": "value.options",
            "key": "options",
        },
        children: [
            {
                type: 'grid',
                props: gridPropsOptions,
                children: [
                    [
                    {
                        "type": "textfield",
                        "key": "textfield",
                        "children": [],
                        "props": {
                            "fullWidth": true,
                            "label": "Opción",
                            "variant": "filled",
                            "key": "key",
                            "value": ""
                        }
                    },
                        ],
                    [
                    {
                        "type": "textfield",
                        "key": "textfield",
                        "children": [],
                        "props": {
                            "fullWidth": true,
                            "label": "Valor",
                            "variant": "filled",
                            "key": "value",
                            "value": ""
                        }
                    }],
                    [
                        {
                            "type": "textfield",
                            "key": "textfield",
                            "children": [],
                            "props": {
                                "fullWidth": true,
                                "label": "Plantilla de opciones",
                                "variant": "filled",
                                "key": "template",
                                "defaultValue": "{option.key}",
                                "value": ""
                            }
                        }]
                ],
            }
        ]
    }
    addComponentsToTabById({editor: res, components: [options], id: 'props'});

    return res;
}