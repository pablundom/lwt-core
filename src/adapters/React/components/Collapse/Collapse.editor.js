import {addComponentsToTabById, addTab, getBaseEditorSkeleton} from "../../editor/editor.util.js";


export default function () {
    let res = getBaseEditorSkeleton();
    addTab({editor: res, properties: {label: 'Propiedades', id: 'props'}});
    const textfield = {
        type: 'textfield',
        props: {
            key:'label',
            label: 'Etiqueta',
            value: '',
        }
    }
    addComponentsToTabById({editor: res, components: [textfield], id: 'props'});

    return res;
}