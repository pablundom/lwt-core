import {cloneElement, useEffect, useRef, useState} from "react";
import {useStateStore} from "../../hooks/useStateStore.js";
import {Box} from "@mui/material";
import {cloneDeep} from "lodash";


export const EventDecorator = ({component, mode, options, contains, parent, ...props}) => {
    const state = useStateStore();
    const {lwtInstance} = state;
    const [actionsProps, setProps] = useState({});
    const plugin = lwtInstance.findPluginById('event');
    useEffect(() => {
        (async () => {
            if (component.props.events?.length > 0 && plugin) {
                await plugin.hooks.dispatchers.main({state, component, plugin, eventData: {setProps, props: actionsProps}});
            }
        })();

    }, [state]);

    return cloneElement(contains, {...props, ...actionsProps});
}
