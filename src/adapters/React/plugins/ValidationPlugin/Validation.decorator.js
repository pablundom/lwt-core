import {cloneElement, useEffect, useState} from "react";
import {useStateStore} from "../../hooks/useStateStore.js";



export const ValidationDecorator = ({component, options, contains, parent, ...props}) => {
    const state = useStateStore();
    const {lwtInstance: {findPluginById}, buildKey, validation} = state;
    let [newProps, setNewProps] = useState({});
    const keyPath = buildKey(component);
    useEffect(() => {
        if (validation.errors[keyPath]) {
            newProps = {error: Object.values(validation.errors[keyPath]).length > 0, helperText: Object.values(validation.errors[keyPath]).join(' ')};
        } else {
            newProps = {};
        }
        setNewProps(newProps);
    }, [validation.errors])

    return cloneElement(contains, {...props, ...newProps});
}
