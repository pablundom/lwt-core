import {ValidationDecorator} from "./Validation.decorator.js";
import {addComponentsToTabById, addTab} from "../../editor/editor.util.js";
import validationEditor from "./Validation.editor.js";
import validationValidations from "./Validation.validations.js";
import {interpolate} from "../util/template.util.js";
import {cloneDeep} from "lodash";


const onSchemaConfirm = ({component, newProps, state, plugin}) => {
    if (newProps.validation){
        for (let i in newProps.validation) {
            if (i in plugin.validations) {
                if (newProps.validation[i] === '') {
                    delete newProps.validation[i];
                    continue;
                }
                if (typeof plugin.validations[i].builder.props.defaultValue !== "undefined" && plugin.validations[i].builder.props.defaultValue === newProps.validation[i]) {
                    delete newProps.validation[i]
                }
            }
        }
        if (Object.keys(newProps.validation).length === 0) {
            delete newProps.validation;
        }
    }
}
export default {
    name: 'validation',
    reactComponent: ValidationDecorator,
    hooks: {
        modifyEditSchema: validationEditor,
        onEditSchemaConfirm: onSchemaConfirm,
        onValueChange: ({value, state, newValue, pathChanged, component}) => {
            if (component.props.validation ) {
                let {validation: {errors}, updateValidationErrors} = state;
                const validations = Object.fromEntries(Object.entries(component.props.validation).filter(([key, value]) => value && value !== ''));
                for (let i in validations) {
                    const validate = validations[i];
                    const validation = validationValidations[i]
                    if (!validation.validate) {
                        continue;
                    }
                    if (!errors[pathChanged]) {
                        errors[pathChanged] = {};
                    }
                    if (validation.validate({value: newValue, validate, state, component}) || ( (!validations.required  || validations.required === false) &&  newValue === '')) {
                        if (i in errors[pathChanged]){
                            delete errors[pathChanged][i];
                        }
                        continue;
                    }
                    errors[pathChanged][i] = interpolate({string: validation.errorText, data: {validate, value, component, state}});
                }
                errors = cloneDeep(errors)
                updateValidationErrors(errors);
            }
        }
    },
    validations: validationValidations

}