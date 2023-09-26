import {Tabs} from "./Tabs.js";
import {TabsBuilder} from "./Tabs.builder.js";

const onCreate = ({component}) => {
    if (component.children.length > 0 ) {
        return;
    }
    const {tabs, containerClass, ...props} = component.props;
    for (let c of tabs) {
        component.children.push([]);
    }

}
const onAddComponent = ({data, component, index, store}) => {
    const {lwtInstance} = store;
    let newComponent = lwtInstance.createComponentStance(data, component);

    component.children[index].splice(index, 0, newComponent);

}

const onMoveComponentIn = ({data, component, index, store}) => {
    component.children[index].splice(index, 0, data);
    data.parent = component;

}
const onRemoveComponent = ({data, component, ...props}) => {
    component.children.forEach((p, k) => {
        component.children[k] = component.children[k].filter(p => p.id !== data.id);
    })

}


export default {
    type: 'tabs',
    class: Tabs,
    builder: {
        builderClass: TabsBuilder,
        icon: 'tabs',
        group: 'layout',
        index: 2,
        name:'Pestañas',
    },
    hooks: {
        onCreate,
        onAddComponent,
        onMoveComponentIn,
        onMoveComponentOut: onRemoveComponent,
        onRemoveComponent
    },
    defaultProps: {
        tabs: [{
            label: 'Pestaña 1',
            id: 'tab1'
        },
            {
                label: 'Pestaña 2',
                id: 'tab2'
            },
            {
                label: 'Pestaña 2',
                id: 'tab3'
            },
        ]
    }
}