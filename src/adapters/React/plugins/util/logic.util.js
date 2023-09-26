import {compileExpression, useDotAccessOperator} from "filtrex";
import logicExtraFunctions, {useDotAccessOperatorCustom} from "./logic.extraFunctions.js";


export const resolveLogicExpression =({expression, data}) => {
    const filter = compileExpression(expression, { customProp: useDotAccessOperatorCustom, extraFunctions: logicExtraFunctions});
    const res = filter({...data, true: true, false: false});
    return res;
}