import {StyleProperty} from "./StyleProperty.js";
import editor from "./StyleProperty.editor.js"


export default {
    type: 'style_property',
    key:'style_property',
    builder: {
        icon: 'apps',
        name:'Propiedad de Estilo',
        key:'style_property',
        index : 0,
    },
    class: StyleProperty,
    editSchema: editor,
    defaultProps: {
        type: 'color',
        label:'Unidad',
        color: false,
    }

}