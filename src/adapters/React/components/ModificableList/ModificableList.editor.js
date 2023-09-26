import {addComponentsToTabById, addTab, buildComponent, getBaseEditorSkeleton} from "../../editor/editor.util.js";



export default function (state) {
    let res = getBaseEditorSkeleton(state);
    addTab({editor: res, state: state, properties: {label: 'Propiedades', id: 'props'}});
    let columns =  {
        fullWidth: true,
            label: "Nombre de variable arreglo",
            variant: "filled",
            key: "arrayVar",
            "value": ""
    };
    columns = buildComponent({state, type:'textfield', props: columns})

    addComponentsToTabById({editor: res, components: [columns], id: 'props', state: state});

    return res;
}