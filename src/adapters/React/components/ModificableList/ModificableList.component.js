import {ModificableList} from "./ModificableList.js";
import {ModificableListBuilder} from "./ModificableList.builder.js";
import {cloneDeep, get} from "lodash";
import modificableListEditor from "./ModificableList.editor.js";


const onNewElement = ({component, store, lwtInstance, index}) => {
    let template = cloneDeep(component.children[0]);
    let newChildren = lwtInstance.createComponentStance(template, component, true);
    component.children.push(newChildren);
}



const onCreate = ({component, store, lwtInstance}) => {
    const {children} = component;
    children.forEach((p, k) => {
        component.children[k] = lwtInstance.createComponentStance(component.children[0], component, true);
    })

}

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
    if (component.props.key) {
        store.cleanComponentValue(data);
    }
}



export default {
    type: 'modificable_list',
    builder: {
        builderClass: ModificableListBuilder,
        icon: 'edit_note',
        name: 'Lista Modificable',
        group: 'layout',
        index: 3,
    },
    editSchema: modificableListEditor,
    children: [],
    hooks: {
        onNewElement,
        onCreate,
        onAddComponent,
        onMoveComponentIn,
        onMoveComponentOut: onRemoveComponent,
        onRemoveComponent
    },
    class: ModificableList,
    defaultProps: {
        addNewElementsEnabled: true,
        plugins: [
            {
                name: 'container'
            },
            {
                name: 'input'
            }
        ]
    }
}


