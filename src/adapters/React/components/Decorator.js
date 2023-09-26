import {PluginDecoratedComponent} from "./PluginDecoratedComponent.js";
import {useStateStore} from "../hooks/useStateStore.js";
import {useEffect} from "react";
import _ from "lodash";


export const Decorator = ({component, mode, children = [], ...props}) => {
    const store = useStateStore();
    const {lwtInstance} = store;
    mode = mode ?? store.mode;
    const container = lwtInstance?.findComponentById(component.type);
    if (!container) {
        return null;
    }
    let Container = (mode === 'builder' && container.builder?.builderClass) ? container.builder?.builderClass : container.class;
    Container = <Container component={component} mode={mode}  {...component.props} {...props}>{children}</Container>;
    if (!Container) {
        return null;
    }
    return <PluginDecoratedComponent component={component} mode={mode} Container={Container} {...props} />
}
