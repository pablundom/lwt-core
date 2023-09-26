import {cloneElement, useEffect, useState} from "react";
import {useStateStore} from "../../hooks/useStateStore.js";
import {get} from "lodash";



export const InputDecorator = ({component, options, contains, parent, ...props}) => {
    const {value, setValueByComponent, buildKey} = useStateStore();
    const componentValue = get(value, buildKey(component));

    const onInput = (e) => {
        if (component.props.key) {
            setValueByComponent(component, e.target?.value ?? e);
        }
        props.onInput && props.onInput(e);
        props.onChange && props.onChange(e);
    }
    return cloneElement(contains, {onInput, onChange: onInput, ...props,  value: componentValue ?? '', truekey: buildKey(component)});
}
