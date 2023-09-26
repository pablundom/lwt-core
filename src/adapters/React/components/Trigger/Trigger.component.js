import {Trigger} from "./Trigger.js";
import editor from "./Trigger.editor.js"


export default {
    type: 'trigger',
    key:'trigger',
    builder: {
        icon: 'bolt',
        name:'Disparador',
        group: 'flow',
        index : 0,
        dragGroup: 'flow'
    },
    class: Trigger,
    editSchema: editor,
    defaultProps: {    }

}