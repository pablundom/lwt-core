import {Checkbox} from "./Checkbox.js";
import editor from "./Checkbox.editor.js"


export default {
    type: 'checkbox',
    key: 'checkbox',
    builder: {
        icon: 'done',
        name: 'Caja de Verificación',
        group: 'basic',
        index: 0,
    },
    class: Checkbox,
    editSchema: editor,
    defaultProps: {
        "label": "Casilla de Verificación",
        defaultValue: false,
        size: 'medium',
        color: 'primary',
        value_on_checked: true,
        value_on_non_checked: false,
    }

}