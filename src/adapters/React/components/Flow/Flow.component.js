import {Flow} from "./Flow.js";
import editor from "./Flow.editor.js"


export default {
    type: 'flow',
    builder: {
        icon: 'account_tree',
        name:'Flujo',
        group: 'flow',
        index : 0,
    },
    class: Flow,
    editSchema: editor,
    defaultProps: {
      "width": "80vw",
      "height": "50vh"
    }

}