import {isRegExp} from "lodash";
import {resolveLogicExpression} from "../util/logic.util.js";

export default {
    required: {
        builder: {
            type: 'checkbox',
            gridSize: 2,
            props: {
                key: 'required',
                label: 'Requerido',
                defaultValue: false,
                tooltip: {
                    title:'Si el campo es obligatorio o no'
                }
            }
        },
        errorText: 'El campo es obligatorio.',
        validate: ({value, validate, component, state}) => {
            if (!validate) {
                return false;
            }
            if (!typeof value === 'string') {
                return value;
            }
            return value.length > 0;
        }
    },
    minLength: {
        builder: {
            gridSize: 2,
            type: 'textfield',
            props: {
                key: 'minLength',
                label: 'Longitud mínima',
                tooltip: {
                    title:'La longitud mínima que debe tener el campo'
                }
            }
        },
        errorText: 'El campo debe tener al menos ${validate} carácteres',
        validate: ({value, validate, component, state}) => {
            if (!typeof value === 'string') {
                return false;
            }
            return value.length >=validate;
        }
    },
    maxLength: {
        builder: {
            gridSize: 2,
            type: 'textfield',
            props: {
                key: 'maxLength',
                label: 'Longitud Máxima'
            },
        },
        errorText: 'El campo debe tener como máximo ${validate} carácteres',
        validate: ({value, validate, component, state}) => {
            if (!typeof value === 'string') {
                return false;
            }
            return value.length <= validate;
        }
    },
    minNumber: {
        gridSize: 2,
        builder: {
            type: 'textfield',
            props: {
                key: 'minNumber',
                label: 'Número mínimo',
                tooltip: {
                    title: 'Si el campo es númerico, el valor númerico mínimo incluido'
                }
            },
        },
        errorText: 'El campo debe ser un número mayor o igual a ${validate}',
        validate: ({value, validate, component, state}) => {
            if (Number.isNaN(value)) {
                return false;
            }
            return value >= validate;
        }
    },
    maxNumber: {
        builder: {
            gridSize: 2,
            type: 'textfield',
            props: {
                key: 'maxNumber',
                label: 'Número máximo',
                tooltip: {
                    title: 'Si el campo es númerico, el valor númerico máximo incluido'
                }
            }
        },
        errorText: 'El campo debe ser un número mayor o igual que ${validate}',
        validate: ({value, validate, component, state}) => {
            if (Number.isNaN(value)) {
                return false;
            }
            return value <= validate;
        }
    },
    valueList: {
        builder: {
            gridSize: 12,
            type: 'textfield',
            props: {
                key: 'valueList',
                label: 'Lista de valores'
            }
        },
        errorText: 'El campo debe estar entre los siguientes valores ${validate}',
        validate: ({value, validate, component, state}) => {
            if (typeof value !== 'string') {
                return false;
            }
            return validate.split(',').map(p => p.trim()).indexOf(validate) > -1;
        }
    },
    pattern: {
        builder: {
            gridSize: 12,
            type: 'textfield',
            props: {
                key: 'pattern',
                label: 'Expresión regular',
                validation: {
                    validRegexp: true
                }
            }
        },
        errorText: 'El campo debe cumplir el siguiente patrón ${validate}',
        validate: ({value, validate, component, state}) => {
            try{
                return new RegExp(validate).test(value);
            } catch (e) {
                return false;
            }
        }
    },
    custom: {
        builder: {
            gridSize: 12,
            type: 'textfield',
            props: {
                key: 'custom',
                label: 'Validación custom',
            }
        },
        errorText: 'El campo no se ha podido validar',
        validate: ({value, validate, component, state}) => {
            if (typeof value !== 'string') {
                return false;
            }
            try{
                return resolveLogicExpression({expression: validate, data: {value: value, component, state}});
            } catch (e) {
                console.log(e)
                return false;
            }

        }
    },
    validRegexp: {
        errorText: 'El campo no es una expresión regular válida',
        validate: ({value, validate, component, state}) => {
            if (typeof value !== 'string') {
                return false;
            }
            try{
                new RegExp(value);
                return true;
            } catch (e) {
                console.log(e)
                return false;
            }
        }
    },
    number: {
        errorText: 'El campo debe ser un número',
        validate: ({value, validate, component, state}) => {
            return !isNaN(value);
        }
    }
}