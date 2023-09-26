import {Textfield} from "./Textfield.js";
import textfieldEditor from "./Textfield.editor.js"
import textfieldStyles from "./Textfield.styles.js";


export default {
    type: 'textfield',
    key:'textfield',
    builder: {
        icon: 'text_fields',
        group: 'basic',
        key:'textfield',
        name: "Campo de Texto",
        index : 0,
        styles: textfieldStyles
    },
    class: Textfield,
    editSchema: textfieldEditor,
    defaultProps: {
        fullWidth: true,
        label: 'Campo de Texto',
        multiline: false,
        minRows: 1,
        maxRows: null,
        styles: {},
        variant:'filled',
    }
}