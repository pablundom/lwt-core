import {v4 as uuidv4} from 'uuid';
import {FilterEventEmitter} from "./FilterEventEmitter.js";
import {cloneDeep, merge, mergeWith} from "lodash";
import {act} from "react-dom/test-utils";

export class LWT {

    /**
     *
     * @param schema
     * @param store
     * @param options
     * @param mode
     * @param components
     * @param builder
     * @param builderGroup
     * @param plugins
     * @param value
     * @param parser
     * @param eventEmitter
     */
    constructor({schema = {}, store, options = {}, mode, components = [], builder, builderGroup = [], plugins = [],  value = {}, parser = null, eventEmitter}) {
        this.state = store.getState();
        this.originalSchema = cloneDeep(schema);
        this.options = options;
        for(let i of this.iterateThroughComponents(schema)) {
            delete i.id;
        }
        this.store = store;
        this.eventEmitter = eventEmitter ?? new FilterEventEmitter();
        this.schema = schema;
        this.builderGroup = builderGroup;
        this.components = components;
        this.mode = mode;
        this.plugins = plugins;
        this.lwtInstance = this;
        this.builder = builder;
        this.parser = parser;
        this.value = value;
        this.setUpListener();
    }

    setUpListener() {
        let _options = {};
        this.store.subscribe(p => {
            const {schema, options} = p;
            this.eventEmitter.next({action: 'schema:changed', payload: schema})
            this.state = p;
        });
    }

    getOutputJsonSchema(schema) {
        const resObject = cloneDeep(schema ?? this.schema);
        for (let i of this.iterateThroughComponents(resObject)) {
            const type = i.type;
            const findedComponent = this.findComponentByType(type);
            if (!findedComponent) {
                continue;
            }
            const {defaultProps} = findedComponent;
            for (let p in i.props) {
                const value = i.props[p];
                if (defaultProps[p] === value) {
                    i.props[p] = undefined;
                    delete i.props[p];
                }
            }
        }
        return JSON.stringify(resObject, (key, value) => {
            if (typeof value !== "object" || value === null) {
                return value;
            }
            if (Array.isArray(value)) {
                return [...value];
            }
            value = {...value};
            const deletedProps = ['parent', 'id', 'defaultProps', 'builder', 'name', 'hooks', 'plugins'];
            deletedProps.forEach(p => {
                if (value[p]) {
                    delete value[p];
                }
            });
            const defaultValues = ['childrenDefaultProps', 'children'];
            defaultValues.forEach(p => {
                if (value[p] && Object.keys(value[p]).length === 0) {
                    delete value[p];
                }
            });
            return value;
        }, 4);
    }


    addGroup(group) {
        this.builderGroup = [...this.builderGroup, group];
    }


    addGroups(groups = []) {
        groups.forEach(g => this.addGroup(g));
    }
    get builderGroup() {
        return this.state.getProperty('builderGroup');
    }

    set builderGroup(group) {
        return this.state.setProperty('builderGroup', group);
    }
    get lwtInstance() {
        return this.state.getProperty('lwtInstance');
    }

    set lwtInstance(lwtInstance) {
        return this.state.setProperty('lwtInstance', lwtInstance);
    }

    get components() {
        return this.state.getProperty('components');
    }

    set components(components) {
        return this.state.setProperty('components', components);
    }

    get plugins() {
        return this.state.getProperty('plugins');
    }

    addPlugin(plugin) {
        const plugins = this.plugins ?? [];

        plugins.push(plugin);
        this.plugins = plugins;
    }

    addPlugins(plugins = []) {
        plugins.forEach(p => this.addPlugin(p));
    }

    set plugins(plugins) {
        this.state.setProperty('plugins', plugins);
    }

    get schema() {
        return this.state.getProperty('schema');
    }

    set schema(schema) {
        schema = cloneDeep(schema);
        this.state.setProperty('schema', schema);
    }

    updateSchema(schema) {
        schema = cloneDeep(schema);
        schema = this.createComponentStance(schema, null, false);
        this.state.setProperty('schema', schema);
    }
    get mode() {
        return this.state.getProperty('mode');
    }

    set mode(mode) {
        this.state.setProperty('mode', mode);
    }

    get options() {
        return this.state.getProperty('options');
    }

    set options(options) {
        this.state.setProperty('options', options);
    }


    get value() {
        return this.state.value;
    }

    set value(value) {
        this.state.setProperty('value', value);
    }

    findPluginById(name) {
        return this.plugins.find(p1 => p1.name ===name);
    }


    findComponentById(id) {
        const res = this.components.find(s => s.type === id);
        if (res) {
            delete res.aux;
            return {...res};
        }
        return null;
    }

    findComponentByType(type) {
        const res = this.components.find(s => s.key === type);

        if (res) {
            return {...res};
        }
        return null;
    }

    addComponent(component) {
        this.components.push(component);
    }

    addComponents(components) {
        if (Array.isArray(components)) {
            components.forEach((c) => {
                this.addComponent(c)
            })
        }
    }

    parse(element) {
        const parserInstance = new this.parser({store: this.store});
        parserInstance.parse(element);
    }

    addBuilder(builderElement) {
        this.builderInstance = new this.builder({store: this.store, element: builderElement});
        this.mode = 'builder';
    }

    addParser(renderElement) {
        this.renderInstance = new this.parser({store: this.store, element: renderElement});
        this.mode = 'full';
    }

    render() {
        this.schema = this.createComponentStance(this.schema, undefined, true);
        if (this.builderInstance) {
            this.builderInstance.build();
        }
        if (this.renderInstance) {
            this.renderInstance.parse();
        }
    }

    setParser(parser) {
        this.parser = parser;
    }

    get schemaComponents() {
        return this.state.getSchemaComponents();
    }

    _handleComponentPluginInstanciate(component, parent) {
        if (component.props.plugins) {
           this.state.callPluginHook({component, hookName: 'onComponentInstanciate', state: this.state})
        }
    }

    *iterateThroughComponents(component) {
        if (Object.keys(component).length === 0) {
            return;
        }
        const toIterate = component ?? this.schema;
        yield component;
        if (!toIterate.children) {
            return;
        }
        for (let i of toIterate?.children) {
            if (Array.isArray(i)) {
                for (let j of i) {
                    yield *this.iterateThroughComponents(j);
                }
                continue;
            }
            yield i;
            if (!i?.children) {
                continue;
            }
            yield *this.iterateThroughComponents(i);
        }
    }
    _handleComponentOncreate(component) {
        if (component.hooks?.onCreate) {
            component.hooks?.onCreate({component, store: this.store, lwtInstance: this, value: this.store.getState().value});
        }
    }

    _handleChildrenNewStance(component, isNew) {
        if (!Array.isArray(component.children)){
            return;
        }
        for (let [key, children] of component.children.entries()) {
            if (Array.isArray(component.children[key])) {
                for (let [key2, children2] of component.children[key].entries()) {
                    component.children[key][key2] = this.createComponentStance(children2, component, isNew);
                }
                continue;
            }
            component.children[key] = this.createComponentStance(children, component, isNew);
        }
    }
    getDefaultProps(component, result, parent) {
        let res = result ?? {};
        if (component?.childrenDefaultProps) {
            res = {...component.childrenDefaultProps, ...res }
        }
        if (component?.parent || parent) {
            let p = component?.parent ?? parent;
            res = {...this.getDefaultProps(p, res, p?.parent), ...res};
        }
        return res;
    }

    createTempComponent({component, parent}) {
        const baseComponent = this.findComponentById(component.type);
        let result = cloneDeep(baseComponent);
        result.parent = parent;
        this.handleProps({component: result, componentInfo: component, baseComponent: baseComponent, parent})

        return result;
    }

    handleProps({component, componentInfo, baseComponent, parent}) {
        if (!component.props) {
            component.props = {};
        }
        const customizer = (objValue, srcValue) => {
            if (_.isArray(objValue)) {
                return srcValue.concat(objValue);
            }
        };
        let props = component.props;

        let defaultParentProps = this.getDefaultProps(componentInfo, {}, parent);
        props = {...defaultParentProps, ...baseComponent.defaultProps,...componentInfo.props};
        mergeWith(props, this.options.default?.props, customizer);
        component.childrenDefaultProps = componentInfo.childrenDefaultProps ?? {};
        component.props = props;

    }
    buildComponent
    createComponentStance(componentInfo, parent, isNew = false) {
        const baseComponent = this.findComponentById(componentInfo.type);
        let result = cloneDeep(baseComponent);
        if (!result) {
            return {};
        }

        if (!componentInfo.id || isNew) {
            result.id = uuidv4();
        }
        if (componentInfo.children) {
            result.children = cloneDeep(componentInfo.children);
        } else {
            result.children = [];
        }
        delete result.icon;
        result.state = result.state ?? {};
        if (parent) {
            result.parent = parent;
        }
        this.handleProps({component: result, componentInfo, baseComponent, parent});

        this._handleChildrenNewStance(result, isNew);
        this._handleComponentPluginInstanciate(result, parent);

        this._handleComponentOncreate(result);

        return result;
    }

}