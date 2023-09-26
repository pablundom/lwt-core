import {InputDecorator} from "./Input.decorator.js";
import inputEditor from "./Input.editor.js";
import inputComponentInstanciate from "./Input.component.instanciate.js";


export default {
    name: 'input',
    reactComponent: InputDecorator,
    hooks: {
        modifyEditSchema: inputEditor,
        onComponentInstanciate: inputComponentInstanciate,
    },
}