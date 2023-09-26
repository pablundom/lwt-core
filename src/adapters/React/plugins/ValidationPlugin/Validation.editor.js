import {addComponentsToTabById, addTab} from "../../editor/editor.util.js";

export default ({editSchema, plugin}) => {
    addTab({editor: editSchema, properties: {label: 'Validación', id: 'validation'}});
    const title = {
        "type": "text",
        "props": {
            text: "Validaciones",
            variant: 'h5'
        },
    };
    addComponentsToTabById({editor: editSchema, components: [title], id: 'validation'});
    const validations = Object.values(plugin.validations).filter(p => p.builder);
    const columnsProps = validations.map(p => ({xs: p.builder.gridSize}));
    const gridChildren = [];
    const grid = {
        type: 'grid',
        props: {
            spacing: 2,
            columnsProps
        },
        children: gridChildren
    }
    for (let o of validations) {
        o.builder.props.key = o.builder.props.key.indexOf('validation.') > -1 ? o.builder.props.key:  `validation.${o.builder.props.key}`;
        const component = {
            type: o.builder.type,
            props: o.builder.props,
        }
        gridChildren.push([component]);
    }
    addComponentsToTabById({editor: editSchema, components: [grid], id: 'validation'});
    return editSchema;
};