import {createStore} from "zustand/vanilla";
import {cloneDeep, get as getObjectPath, set as setObjectPath, unset} from "lodash";

export const getNewStore = () => {
    return createStore((set, get) => ({
        lwtInstance: null,
        value: {},
        schema: {},
        componentEditting: null,
        state: {},
        validation: {errors: {}},
        getSchemaComponents() {
            const {getComponentChildrens, schema, lwtInstance} = get();
            const result = [];
            if (Object.keys(schema).length === 0) {
                return result;
            }
            getComponentChildrens(schema, result);

            return result;
        },

        findComponentById(id) {
            const {getSchemaComponents} = get();

            return getSchemaComponents().find(p => p.id === id);
        },

        getComponentChildrens(component, result) {
            result.push(component);
            if (!component.children || component.children?.length === 0) {
                return result;
            }
            for (let c of component.children) {
                if (Array.isArray(c)) {
                    for (let c1 of c) {
                        get().getComponentChildrens(c1, result);
                    }
                    continue;
                }
                get().getComponentChildrens(c, result);
            }
            return result;
        },
        setComponentEditting(component) {
            set({componentEditting: component})
        },
        setLwtInstance(newValue) {
            set({lwtInstance: newValue})
        },
        setValue(path, newValue, component) {
            const store = get();
            const {lwtInstance, value, plugins} = store;
            setObjectPath(value, path, newValue);
            lwtInstance.eventEmitter.next({
                action: 'schema:value:changed',
                payload: {value: value, store}
            });
            store.callPluginHook({component, hookName: 'onValueChange', value, newValue, pathChanged: path})
            set({value})
        },
        buildKey(component) {
            let current = component;
            let keys = [component.props?.key];
            while (true) {
                const parent = current.parent;
                if (!parent) {
                    break;
                }
                current = parent;
                const key = parent.props?.key;
                if (!key) {
                    continue;
                }
                keys.push(key);
            }

            keys = keys.filter(k => typeof k !== "undefined");
            keys = keys.reverse();
            keys = keys.join('.');
            return keys;
        },
        setValueByComponent(component, newVal) {
            const {value, buildKey} = get();
            const key = buildKey(component);
            newVal = newVal ?? getObjectPath(value, key);
            newVal = newVal ?? component.props.defaultValue ?? '';
            component.props.value = newVal;
            get().setValue(key, newVal, component);
        },
        getProperty(property) {
            return get()[property]
        },
        setProperty(property, value) {
            set({[property]: value})
        },
        addComponent(componentInfo, parent, index) {
            const {schema, lwtInstance} = get();
            let newComponent = lwtInstance.createComponentStance(componentInfo, parent);
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.splice(index, 0, newComponent);

            set({schema: schema});
        },
        setProperties(properties) {
            set(cloneDeep(properties));
        },
        callPluginHook({component, hookName, ...data}) {
            const state = get();
            const {lwtInstance} = state;
            for (let p of component.props.plugins) {
                const findedPlugin = lwtInstance.findPluginById(p.name);
                if (findedPlugin && findedPlugin.hooks?.[hookName]) {
                    findedPlugin.hooks[hookName]({component, state: state, plugin: findedPlugin, ...data})
                }
            }
        },
        updateValidationErrors(errors) {
            let validation = get().validation;
            validation = cloneDeep(validation);
            validation.errors = errors;
            set({validation})
        },
        updateSchema() {
            const {errors, value, schema} = get();
            set({errors, value, schema})
        },
        cleanComponentValue(component) {
            const {buildKey, value} = get();
            const key = buildKey(component);
            unset(value, key);
        },
        moveComponent(componentInfo, parent, index) {
            const {schema, getParent} = get();
            let ogComponentParent = getParent(componentInfo);
            ogComponentParent.children = ogComponentParent.children.filter(p => p.id !== componentInfo.id);

            componentInfo.parent = parent;
            parent.children.splice(index, 0, componentInfo);

            set({schema: schema});
        },
        getParent(component) {
            const {getSchemaComponents} = get();
            return getSchemaComponents().find(p => p.children.find(p1 => p1.id === component.id));
        },
        removeComponent(component) {
            let {schema, getParent} = get();
            let auxParent = getParent(component);
            if (auxParent) {
                auxParent.children = auxParent.children.filter(p => p !== component);
            }
            set({schema});
        },

    }))
}
