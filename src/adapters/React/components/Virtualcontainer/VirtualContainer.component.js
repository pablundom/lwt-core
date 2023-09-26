import {VirtualContainer} from "./VirtualContainer.js";
import editor from "./VirtualContainer.editor.js"
import {get} from "lodash";
import virtualcontainerHooks from "./VirtualContainer.hooks.js";
import {VirtualcontainerBuilder} from "./Virtualcontainer.builder.js";
import {Box} from "@mui/material";



export default {
    type: 'virtual_container',
    hooks: virtualcontainerHooks,
    builder: {
        icon: 'inbox_customize',
        name:'Contenedor Virtual',
        builderClass: VirtualcontainerBuilder,
        group: 'layout',
        index : 0,
    },
    class: VirtualContainer,
    editSchema: editor,
    defaultProps: {
        template: [],
        iterableObjectPath: undefined,
        wrapper: {
            container: {
                class: Box,
                props: {}
            },
            children: {
                class: Box,
                props: {}
            }
        }
    }

}