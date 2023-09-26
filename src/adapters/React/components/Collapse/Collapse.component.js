import {Collapse} from "./Collapse.js";
import editor from "./Collapse.editor.js"
import {CollapseBuilder} from "./Collapse.builder.js";


export default {
    type: 'collapse',
    builder: {
        builderClass: CollapseBuilder,
        icon: 'expand_more',
        name: 'Desplegable',
        group: 'layout',
        index: 0,
    },
    class: Collapse,
    editSchema: editor,
    children: [
        {
            type: 'container',
            props: {},
            children: []
        },
        {
            type: 'container',
            props: {},
            children: []
        }
    ],
    defaultProps: {
        "openedDefault": false,
    }

}