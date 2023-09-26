import {Button} from "./Button.js";
import editor from "./Button.editor.js"


export default {
    type: 'button',
    builder: {
        icon: 'crop_16_9',
        name:'Botón',
        group: 'basic',
        index : 0,
    },
    class: Button,
    editSchema: editor,
    defaultProps: {
      "variant": "contained",
        value: "Botón",
        iconButton: false
    }

}