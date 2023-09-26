import {cloneDeep} from "lodash";

const getIndex = (str) => {
    if (str.indexOf('[') === -1 || !str.endsWith(']')) {
        return;
    }
    const res = str.split('[')[1].split(']')[0];

    return Number(res);
}
export default ({component, state, parent}) => {

    const ogKey = component.props.key ?? component.key;
    if (!ogKey || ogKey === '') {
        return;
    }
    component.props.key = ogKey;
    const regex = /\[(.*)]/g;
    if (ogKey.match(regex)) {
        const matches =     [...ogKey.matchAll(regex)];
        matches.forEach(m => {
            const replaceIndex = m[0];
            let newIndex;
            if (!component.props.virtual_container_index) {
                const indexes = state.getSchemaComponents().filter(p => p.id && p.id !== component.id && p.props.key
                    && p.props.key.replace(regex, '') === ogKey.replace(regex, '')).map(p => getIndex(p.props.key))
                newIndex = indexes.length;
            } else {
                newIndex = component.props.virtual_container_index;
            }
            component.props.key = ogKey.replace(replaceIndex, `[${newIndex}]`)
        })
    }
    state.setValueByComponent(component);
};