import {cloneElement, useEffect, useState} from "react";
import {flatObjectAnyString} from "../../../../util/object.util.js";
import {cloneDeep, get} from "lodash";
import {useStateStore} from "../../hooks/useStateStore.js";


export const PropsParserDecorator = ({component, contains, ...props}) => {
    let [newProps, setNewProps] = useState(cloneDeep(component.props));
    const state = useStateStore();
    const {value} = state;
    useEffect(() => {
        newProps = cloneDeep(component.props);
        const flat = flatObjectAnyString(newProps);
        const entireObject = {component, ...state};
        const filteredProps = flat.filter(p =>Object.values(p).some((p1,k) => typeof p1 === 'string' && p1.startsWith('#')));
        const keys = filteredProps.map(p => Object.entries(p).filter(s => typeof s[1] === 'string').find(s =>  s.at(1)?.startsWith(('#')))[0]);
        for (let [key, prop] of keys.entries()) {
            const aux = filteredProps?.[key]?.[prop];
            if (aux) {
                const path = aux.substring(1);
                filteredProps[key][prop] = get(entireObject, path, aux);
            }
        }
        setNewProps(cloneDeep(newProps));
    }, [state, value, component.props]);
    return cloneElement(contains, {...props, ...newProps});
}
