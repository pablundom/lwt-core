import {cloneDeep, get, set} from "lodash";
import {act} from "react-dom/test-utils";


export const setVarAction = ({state, component, event, eventData, action, data}) => {
    data = {...state, component, true: true, false: false, data};
    const variable = action.operation.var;
    const actualValue = get(data, variable, undefined);
    const value = action.operation.value;
    if (actualValue !== value) {
        set(data, variable, value);
        state.updateSchema();
    }

}
const getElementInArray = ({element, array}) => {
    let res;
    for (let c of array) {
        if (Array.isArray(c)) {
            for (let c1 of c) {
                if (c1.id === element.id) {
                    res = array.indexOf(c);
                    break;
                }
            }
        }
        if (res) {
            break;
        }
        if (c.id === element.id) {
            res = array.indexOf(c);
            break;
        }
    }
    return res;
}

export const callComponentFunction = ({state, component, eventData, event, action, data}) => {
    const globalData = {state, component, eventData, event, action, data};
    let functionName = action.scope.function;
    if (functionName.indexOf('hooks') === -1) {
        functionName = `hooks.${functionName}`
    }
    const functionReference = get(globalData, `${action.scope.component}.${functionName}`);
    const argsNames = action.scope.args;
    const args = [];
    for (let arg of argsNames) {
        if (Array.isArray(arg)) {
            const objectArg = {};
            for (let a of arg) {
                const splitedObject = a.split(':');
                let propertyName;
                let propertyValuePath;
                if (splitedObject.length === 1) {
                    propertyName = splitedObject[0].trim();
                    propertyValuePath = propertyName;
                }  else {
                    propertyName = splitedObject[0].trim();
                    propertyValuePath = splitedObject[1].trim();
                }
                objectArg[propertyName] = get(globalData, propertyValuePath);
            }
            args.push(objectArg);
            continue;
        }
        args.push(get(globalData, arg))
    }
    functionReference(...args);
    state.updateSchema();

}
export const removeArrayChildren = ({state, component, eventData, event, action, data}) => {
    const res = {};
    const {array: arrayPath, children: childrenPath} = action.scope;
    const {output} = action;
    const globalData = {state, component, eventData, event, value:state.value, action, data};
    const array = get(globalData, arrayPath);
    const children = get(globalData, childrenPath);
    let index = undefined;
    if (children && array) {
        index = getElementInArray({element: children, array});
    }
    if (action.scope?.index) {
        index = get(globalData, action.scope.index);
    }
    if (typeof index !== "undefined" && array) {
        array.splice(index, 1);
    }
    state.updateSchema();
    if (output && index) {
        if (output.index) {
            res[output.index] = index;
        }
    }
    return res;
}

const addArrayChildren = ({state, component, eventData, event, action, data}) => {
    const {array: arrayPath, element: elementPath} = action.scope;
    const globalData = {state, component, eventData, event, value:state.value, action, data};
    const array = get(globalData, arrayPath);
    let element = get(globalData, elementPath);
    if (array && element) {
        element = cloneDeep(element)
        array.push(element);
        state.updateSchema();
    }
}

export default {
    removeArrayChildren,
    setVarAction,
    callComponentFunction,
    addArrayChildren
}