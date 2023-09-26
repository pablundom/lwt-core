import {addComponentsToTabById, addTab} from "../../editor/editor.util.js";
import {cloneDeep, merge} from "lodash";


export default ({editSchema, state, component, plugin}) => {
    addTab({editor: editSchema, properties: {label: 'Estilos', id: 'styles'}});
    const stylesTabs = {
        "type": "tabs",
        "name": "Pestaña de estilos",
        "key": "tabs",
        "defaultProps": {},
        "children": [
            [],
            []
        ],
        "props": {
            "containerClass": "container",
            key: 'styles',
            "tabs": [{label: 'Clases', id: 'classes'}, {label: 'Editor de Estilos', id: 'styles'}],
            sx: {
                p: 0,
                m: 0
            }
        }
    };

    stylesTabs.children[1].push(...buildStyleTabContent({editSchema, state, component, plugin}));
    stylesTabs.children[0].push(...buildClassTabContent({editSchema, state, component, plugin}));
    addComponentsToTabById({editor: editSchema, components: [stylesTabs], id: 'styles'});
    return editSchema;
}

const buildClassTabContent = ({editSchema, state, component, plugin}, newParam = []) => {
    let options = state.schema.props.lwt_classes_definition ?? [];
    options = Object.keys(options).map(c => ({key: p, value: p}));
    const header = {type: 'text', props: {text:'Seleccionar clases', variant: 'h5'}};
    const selectedClasses = {
        type:'select',
        props: {
            key:'lwt_classes',
            label:'Clases seleccionadas',
            multiple: true,
            options: options
        }
    }
    const classEditor = {
        type:'grid',
        children: [
          [{
              type: 'select',
              props: {
                  key:'lwt_classes',
                  options: options
              }
          }],
          [{
              type: 'button',
              props: {
                  value: 'Crear Clase'
              }
          }]
        ],
        props: {
            key:'selected_lwt_editor_class',
            label:'Clases seleccionadas',
            options: options,
            columnsProps: [{xs: 10}, {xs: 2}]
        }
    }
    const header2 = {type: 'text', props: {text:'Editor de clases', variant: 'h5'}};
    return [header, selectedClasses, header2, classEditor]
}

const buildStyleTabContent = ({editSchema, state, component, plugin}) => {
    const {defaultStyles} = plugin.props ?? {};
    const componentStyleProps = component.builder.styles ?? {};
    const styleProps = {};
    merge(styleProps, componentStyleProps, defaultStyles);
    const result = [];
    for (let s in styleProps) {
        const aux = styleProps[s];
        const header ={
            type:'grid',
            children: [
                [{type: 'text', props: {text: aux.name, variant: 'h5', sx: {m: 0, p: 0}}}],
                [{type: 'button', props: {iconButton: true, value: 'expand_more'}}],
            ],
            props: {
                columnsProps: [{xs: 11}, {xs: 1}]
            }
        }
        const description = {type: 'text', props: {text: aux.description, variant: 'p'}};
        const headerContainer = {
            type:'container',
            props: {},
            children: [
                header,
                description
            ]
        }
        const grid = {
            type: 'container',
            props: {
                key: s,
            },
            children: []
        }
        for (let i in aux.properties) {
            const containerChildrens = [];
            const gridUnits = {
                type: 'container',
                props: {
                },
                children: containerChildrens
            }
            const property = aux.properties[i];
            const newComponent = cloneDeep(property);
            containerChildrens.push(newComponent);

            grid.children.push(gridUnits)
        }
        const collapse = {
            type: 'collapse',
            props: {
                openedDefault: false
            },
            children: [headerContainer, grid]
        }
        result.push(...[collapse]);
    }

    return result;

}