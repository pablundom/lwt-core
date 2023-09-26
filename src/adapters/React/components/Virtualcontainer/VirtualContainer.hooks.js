
import {cloneDeep, get, set} from "lodash";

const generateComponentsByTemplate = ({component, element, template, state, index}) => {
    const {lwtInstance} = state;
    let templateCopy = cloneDeep(template);
    let result = [];
    for (let [k, c] of templateCopy.entries()){
        for (let c1 of lwtInstance.iterateThroughComponents(c)) {
            c1.props.virtual_container_index = index;
        }
        let componentToAdd = lwtInstance.createComponentStance(c, component, true);
        result.push(componentToAdd);
    }

    return result;
}
const onRemoveComponent = ({data, component,store}) => {
    component.props.template = component.props.template.filter(p => p.id !== data.id);
}
const onMoveComponentIn = ({data, component, index}) => {
    data.parent = component;
    component.props.template?.splice(index, 0, data);

}

const onAddComponent = ({data, component, index, store}) => {
    const {lwtInstance, updateSchema} = store;
    let newComponent = lwtInstance.createComponentStance(data, component);
    component.props.template?.splice(index, 0, newComponent);

    updateSchema();
}

const onGetVirtualComponents = ({component, state}) => {
    const {iterableObjectPath, template} = component.props;
    if (!iterableObjectPath) {
        return [];
    }
    let iterableObject = get({component, ...state}, iterableObjectPath);
    if (!iterableObject) {
        set({component, ...state}, iterableObjectPath, []);
        state.updateSchema();
        iterableObject = [];
    }
    if (!template || !Array.isArray(template)) {
        return [];
    }
    iterableObject =cloneDeep(iterableObject);
    const result = [];
    for (let [index, element] of Object.values(iterableObject).entries()) {
        result.push(generateComponentsByTemplate({component, template, state, element, index}))
    }
    return result;
}

const onNewElement = ({component, data, state}) => {
    const objectVar = get({component, ...state}, component.props.iterableObjectPath);
    let newArray = [];
    if (objectVar) {
        newArray = Object.values(objectVar);
    }
    newArray.push({});
    set(state, component.props.iterableObjectPath, newArray);

    state.updateSchema();
}

const onRemoveCell = ({component, state, index}) => {
    let objectVar = get({component, ...state}, component.props.iterableObjectPath);
    if (objectVar) {
        if (Array.isArray(objectVar)) {
            objectVar = [...objectVar];
            objectVar.splice(index, 1);
            set({component, ...state}, component.props.iterableObjectPath, objectVar);
        } else if (typeof objectVar === 'object') {
            const newObject = cloneDeep(objectVar);
            index = Object.keys(newObject)[index];
            delete newObject[index];
            set({component, ...state}, component.props.iterableObjectPath, newObject);
        }
        state.updateSchema();
    }
}
export default {
    onGetVirtualComponents,
    onAddComponent,
    onNewElement,
    onRemoveCell,
    onMoveComponentIn,
    onMoveComponentOut: onRemoveComponent,
    onRemoveComponent
}

