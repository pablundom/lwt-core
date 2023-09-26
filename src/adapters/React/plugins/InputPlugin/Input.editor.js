import {addComponentsToTabById, addTab} from "../../editor/editor.util.js";

export default ({editSchema, state, component}) => {
    addTab({editor: editSchema, properties: {label: 'Valor', id: 'data'}});
    const key = {
        "type": "textfield",
        "props": {
            key: 'key',
            fullWidth: true,
            label: 'Clave de valor'
        },
    };
    addComponentsToTabById({editor: editSchema, components: [key], id: 'data'});
    return editSchema;
};