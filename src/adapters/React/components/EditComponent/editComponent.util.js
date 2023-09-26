import {cloneDeep} from "lodash";
import {getBaseEditorSkeleton} from "../../editor/editor.util.js";


export const getEditSchema = ({component, state}) => {
    let editSchema = component.editSchema;
    if (!editSchema) {
        editSchema = getBaseEditorSkeleton();
    } else {
        editSchema = cloneDeep(component.editSchema({component, state}));
    }
    state.callPluginHook({component, hookName: 'modifyEditSchema', state: state, editSchema})
    return editSchema;
}