import {Decorator} from "../Decorator.js";
import "./BuilderDecorator.css";
import {Icon} from "@mui/material";
import {useDrag} from "react-dnd";
import {useState} from "react";
import {useStateStore} from "../../hooks/useStateStore.js";

export const BuilderDecorator = ({component, toolbar=true, children = [], ...props}) => {
    const store = useStateStore();
    const {setComponentEditting, updateSchema, setProperty, lwtInstance} = store;
    const [styleClass, setStyleClass] = useState('builder-component-toolbar')
    const [_, drag, dragPreview] = useDrag(() => {
        return {
            type: 'component-builder',
            item: {component: {...component}}
        }
    }, [component]);

    const onConfirmEdit  =(e) => {
        const {value} = e;
        for (let v in value) {
            if (v === "") {
                delete value[v];
            }
        }
        component.props = {...component.props, ...value}
    }
    const onClickDeleteButton = () => {
        const parentRemoveHook = component.parent?.hooks?.onRemoveComponent;
        parentRemoveHook && parentRemoveHook({data: component, component: component.parent, store, ...props});
        updateSchema();
    }
    const onEdit = (e) => {
        setComponentEditting({component, onConfirmEdit});
    }
    const onMouseOver = (e) => {
        e.stopPropagation();
        const style = `builder-component-toolbar-show builder-component-toolbar`;
        setStyleClass(style)
    }
    const onMouseLeave = (e) => {
        e.stopPropagation();
        const style = `builder-component-toolbar`;
        setStyleClass(style)
    }
    const onOpenSchema = () => {
        const json = lwtInstance.getOutputJsonSchema(component);
        setProperty('jsonViewer', JSON.parse(json));
    }
    return <div className="builder-component-container" ref={dragPreview} onMouseOver={onMouseOver} onMouseOut={onMouseLeave}>
        <Decorator component={component} children={children} {...props} />
        {toolbar ?
        <div className={styleClass}>
            {component.parent ? <span ref={drag}>{component?.builder?.name}
                <Icon className="builder-component-toolbar-move" >open_with</Icon></span>
                :  <span>{component?.builder?.name}</span>}
            <Icon onClick={onEdit}>edit</Icon>
            <Icon onClick={onOpenSchema}>javascript</Icon>
            {component.parent ? <Icon onClick={onClickDeleteButton}>delete</Icon> : null}
        </div> : null}
    </div>
}
