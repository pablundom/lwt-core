import skeleton from "./skeleton.json";
import {cloneDeep} from "lodash";

export const getBaseEditorSkeleton = () => {
    return cloneDeep(skeleton);
}

export const findTabsComponent = (editor) => {
    return editor.children.find(p => p.type === 'tabs');
}
const findTabComponent = (editor) => {
    return editor.children.find(p => p.type === 'tabs');
}
export const buildComponent = ({type, parent, props = {}, ...moreProps}) => {
    let component = {type, props, ...moreProps};
    if (!component) {
        return;
    }
    component = cloneDeep(component);
    component.props = props;
    component = {...component, ...moreProps};

    return component;
}
export const addTab = ({editor, properties : {label, content, ...props}}) => {
    const tabs = findTabsComponent(editor);
    if (tabs) {
        tabs.props.tabs.push({label, ...props});
        tabs.children.push([]);
    }

}

export const addComponentsToTabById = ({editor, components, id}) => {
    for (let component of components) {
        addComponentToTabById({editor, component, id});
    }
}
const addComponentToTabById = ({editor, component, id}) => {
    const tab = findTabsComponent(editor);
    const tabChosen = tab.props?.tabs.find(p => p.id === id);
    if (!tabChosen) {
        return;
    }
    const index = tab.props?.tabs.indexOf(tabChosen);
    const tabContent = tab.children[index];


    tabContent.push(component);
}

const addComponentToContainer = ({container, component}) => {
    container.children?.push(component);
}