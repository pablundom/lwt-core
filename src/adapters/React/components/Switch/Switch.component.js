import {Switch} from "./Switch.js";
import editor from "./Switch.editor.js"


export default {
    type: 'switch',
    key:'switch',
    builder: {
        icon: 'toggle_on',
        name:'Interruptor',
        group: 'basic',
        index : 0,
    },
    class: Switch,
    editSchema: editor,
    defaultProps: {
      "label": "Interruptor",
      "defaultValue": false,
      "value_on_toggled": true,
      "value_on_untoggled": false
    }

}