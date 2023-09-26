import {EventDecorator} from "./Event.decorator.js";
import {addTab} from "../../editor/editor.util.js";
import {merge} from "lodash";
import eventActions from "./Event.actions.js";
import eventTriggers from "./Event.triggers.js";


const dispatcher = async ({state, component, plugin, eventData = {}}) => {
    for (let e of component.props.events) {
        const actionsHandler = async () => {
            const newData = await plugin.hooks.dispatchers.action(
                {plugin, event: e, component, state, actionsHandlers: plugin.hooks.actions, eventData});
            if (newData) {
                merge(eventData, newData);
            }
        }
        await plugin.hooks.dispatchers.trigger(
            {
                plugin,
                event: e,
                component,
                state,
                triggersHandlers: plugin.hooks.triggers,
                eventData,
                actionsHandler
            });
    }
    return eventData;
}
const triggerDispatcher = async ({triggersHandlers, component, state, event, actionsHandler, eventData}) => {
    let res = false;
    if (triggersHandlers[event?.trigger?.type]) {
        res = await triggersHandlers[event.trigger.type]({state, component, event, actionsHandler, eventData});
    }

    return res;
}


const actionDispatcher = async ({actionsHandlers, component, state, event, eventData}) => {
    let data = {};
    for (let action of event.action?.actions) {
        if (actionsHandlers[action.type]) {
            let newData = await actionsHandlers[action.type]({state, component, event, action, data, eventData});
            if (newData) {
                merge(data, newData);
            }
        }
    }

    return data;

}

export default {
    name: 'event',
    reactComponent: EventDecorator,
    hooks: {
        onComponentInstanciate: ({component, state, parent}) => {
            component.props.events = component.props.events ?? [];
        },
        modifyEditSchema: ({editSchema, state, component}) => {
            addTab({editor: editSchema, properties: {label: 'Eventos', id: 'events'}});

            return editSchema;
        },
        dispatchers: {
            trigger: triggerDispatcher,
            main: dispatcher,
            action: actionDispatcher
        },
        triggers: eventTriggers,
        actions: eventActions
    },
}