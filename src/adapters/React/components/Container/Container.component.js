import {Container} from "./Container.js";
import {ContainerBuilder} from "./Container.builder.js";
import {useStateStore} from "../../hooks/useStateStore.js";


const onAddComponent = ({data, component, index, store}) => {
    const {lwtInstance, updateSchema} = store;
    let newComponent = lwtInstance.createComponentStance(data, component);
    if (!component.children) {
        component.children = [];
    }
    component.children.splice(index, 0, newComponent);

    updateSchema();
}

const onMoveComponentIn = ({data, component, index, store}) => {
    data.parent = component;
    if (!component.children) {
        component.children = [];
    }
    component.children.splice(index, 0, data);

}
const onRemoveComponent = ({data, component, store}) => {
    component.children = component.children.filter(p => p.id !== data.id);

}
export default {
    type: 'container',
    class: Container,
    builder: {
        builderClass: ContainerBuilder,
        icon: 'view_cozy',
        name: 'Contenedor',
        group: 'layout',
        index: 0
    },
    builderClass: ContainerBuilder,
    hooks: {
        onAddComponent,
        onMoveComponentIn,
        onMoveComponentOut: onRemoveComponent,
        onRemoveComponent
    },
    defaultProps: {
        plugins: [
            {
                name: 'container'
            }
        ]
    }
}