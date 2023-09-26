import {Text} from "./Text.js";
import editor from "./Text.editor.js"


export default {
    type: 'text',
    builder: {
        icon: 'abc',
        name: 'Texto',
        group: 'basic',
        index: 0,
    },
    class: Text,
    editSchema: editor,
    defaultProps: {
        text: "Escribe un texto...",
        variant: "span",
        gutterBottom: true,
        value: "",
        plugins: []
    }

}