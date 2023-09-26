import {cloneElement, useEffect, useState} from "react";
import {useStateStore} from "../../hooks/useStateStore.js";
import {get} from "lodash";
import {resolveLogicExpression} from "../util/logic.util.js";



export const VisibilityDecorator = ({component, mode, options, contains, parent, ...props}) => {
    const state = useStateStore();
    const isVisible = () => {
        let isVisible = component.props.visibility?.visible ?? true;
        if (component.props?.visibility?.condition) {
            try{
               isVisible = resolveLogicExpression({expression: component.props.visibility.condition, data: {...state, component}})
            } catch (e){
                console.log(e);
            }
        }
        return isVisible ===  true  || mode === 'builder';
    }
    if (!isVisible()) {
        return null;
    }
    return  cloneElement(contains,  {...props})
}
