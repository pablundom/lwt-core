import {VisibilityDecorator} from "./Visibility.decorator.js";
import visibilityEditor from "./Visibility.editor.js";

const onEditSchemaConfirm  =({newProps, component}) => {
    if (newProps.visibility) {
        if (newProps.visibility.visible === true && newProps.visibility.condition === "") {
            delete newProps.visibility;
        }
    }
}

export default {
    name: 'visibility',
    reactComponent: VisibilityDecorator,
    hooks: {
        onEditSchemaConfirm: onEditSchemaConfirm,
        onComponentInstanciate: ({component, state, parent}) => {
        },
        modifyEditSchema: visibilityEditor
    }

}