import {capitalize, cloneDeep, get, isBoolean, set} from "lodash";
import {resolveLogicExpression} from "../util/logic.util.js";


export const logic = async ({state, event, component, eventData, actionsHandler}) => {
    let expression = '';
    let res = false;
    try {
        expression = [...event.trigger.operations].join(' and ');
        const expressionRes = resolveLogicExpression({expression, data: {...state, component}});
        res = !isBoolean(expressionRes) ? false : res;
    } catch (e) {
        console.log(e);
        res = false;
    }
    if (res) {
        await actionsHandler();
    }
}

export const domEvent = async ({state, event,  eventData, component, actionsHandler}) => {
    const eventName = event.trigger.event;
    if(eventData.props[eventName]) {
        return;
    }
    const propsResult = {
        [eventName]:  async (e) => {
            await actionsHandler({event: e});
            eventData.props[eventName] &&  eventData.props[eventName](e);
        }
    }
    eventData.setProps({...eventData.props, ...propsResult});

}


export default {
    logic,
    domEvent
}