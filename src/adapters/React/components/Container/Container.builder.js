import {useRef} from "react";
import {useDropController} from "../../hooks/useDropController.js";
import {useStateStore} from "../../hooks/useStateStore.js";


export const ContainerBuilder = ({children, mode, renderChildren, renderContainerBuilder, component, ...props}) => {
    const ref = useRef();
    const store = useStateStore();
    mode = mode ?? store.mode;

    const {drop, isOverCurrent} = useDropController({component, ref});
    drop(ref);
    return renderContainerBuilder({mode, ref, isOverCurrent, component, renderChildren}) ?? null;
}