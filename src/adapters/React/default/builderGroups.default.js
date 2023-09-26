import {BuilderGroup} from "../../../classes/BuilderGroup.js";


const basicGroup = new BuilderGroup({name: 'basic', title:'Básicos', index: 0});
const layoutGroup = new BuilderGroup({name: 'layout', index: 1, title: 'Contenedores'});
const flowGroup = new BuilderGroup({name: 'flow', index: 2, title: 'Flujo'});
export default [
    basicGroup,
    layoutGroup,
    flowGroup
]