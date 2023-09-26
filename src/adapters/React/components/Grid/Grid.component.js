import {Grid} from "./Grid.js";
import {GridBuilder} from "./Grid.builder.js";
import gridEditor from "./Grid.editor.js"
import {cloneDeep} from "lodash";

const onCreate = ({component, store}) => {
    if (component.children.length > 0 && component.props.columnsProps?.length !== component.children.length) {
        const newColumnsProps = [];
        for (let c of Array.from(Array(component.children.length).keys())) {
            newColumnsProps.push(cloneDeep(component.props.defaultColumnProp));
        }
        component.props.columnsProps = newColumnsProps;

    }


}

const onAddNewCell  =({component, state}) => {
    component.props.columnsProps.push(cloneDeep(component.props.defaultColumnProp) ?? {xs: 6});
    component.children.push([]);
    state.updateSchema();
}

const onRemoveCell = ({index, component, state})  => {
    component.props.columnsProps = component.props.columnsProps.filter((c, i) => i !== index)
    component.children = component.children.filter((c, i) => i !== index);
    state.updateSchema();
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

const onEdit = ({newProps, component, state}) => {
    if (newProps.columnsProps){
        newProps.columnsProps.forEach((p) => {
            p.xs = Number(p.xs);
        })
    }
    component.props = {...component.props, ...newProps};
    const difference = component.props.columnsProps.length - component.children.length;
    if (difference === 0) {
        return;
    }
    if (difference > 0) {
        for (let c of Array.from(Array(difference).keys())) {
            component.children.push([]);
        }
    } else {
        const length = component.children.length;
        for (let i = 0; i > difference; i--) {
            component.children = component.children.filter((p, i) => i !==  length + difference);
        }
    }

}
export default {
    type: 'grid',
    name: 'Grid',
    class: Grid,
    editSchema: gridEditor,
    builder: {
        builderClass: GridBuilder,
        icon: 'grid_view',
        group: 'layout',
        name: "Grid"
    },
    hooks: {
        onAddComponent,
        onCreate: onCreate,
        onEdit,
        onRemoveCell,
        onAddNewCell,
        onMoveComponentIn,
        onMoveComponentOut: onRemoveComponent,
        onRemoveComponent
    },
    children: [[], []],
    defaultProps: {
        spacing: 2,
        columns: 12,
        defaultColumnProp: {
            xs: 6,
        },
        plugins: [
            {
                name: 'container'
            }
        ],
        columnsProps: []
    }
}