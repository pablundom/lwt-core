import {StyleDecorator} from "./Style.decorator.js";

import styleEditor from "./Style.editor.js";
import stylesDefaultProperties from "./Styles.defaultProperties.js";

export default {
    name: 'style',
    reactComponent: StyleDecorator,
    hooks: {
        onComponentInstanciate: ({component, state, parent, plugin}) => {
            if (!component.props?.lwt_classes) {
                component.props.lwt_classes = [];
                state.updateSchema();
            }
        },
        modifyEditSchema: styleEditor,
        onEditSchemaBefore: ({props, component, plugin}) => {
            const styleProps = {};
            const {defaultStyles} = plugin.props ?? {};

            return props;

        },
        onEditSchemaConfirm: ({component, newProps, state}) => {
            if (!newProps.styles) {
                return;
            }
            for (let i in newProps.styles) {
                for (let j in newProps.styles[i]) {
                    if (newProps.styles[i][j] === '') {
                        delete newProps.styles[i][j];
                    }
                }

            }
        }
    },
    props: {
        defaultStyles: {
            box: {
                name: 'Estilos del contenedor',
                description: 'Aquí puedes describir los estilos del contenedor',
                properties: stylesDefaultProperties
            },
        }
    },

}