
import {Select} from "./Select.js";
import editSchema from "./Select.editor.js";
export default {
    type: 'select',
    key:'select',
    class: Select,
    builder: {
        icon: 'view_list',
        group: 'basic',
        name:'Lista de Opciones',
        index: 1,
    },
    editSchema: editSchema,
    defaultProps: {
        fullWidth: true,
        label: 'Opciones',
        variant:'filled',
        options: [],
    }
}