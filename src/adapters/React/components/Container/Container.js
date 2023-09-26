
import {useStateStore} from "../../hooks/useStateStore.js";
export const Container = ({children, mode, renderChildren, component, ...props}) => {
    const store = useStateStore();
    mode = mode ?? store.mode;
    return <div>
        {renderChildren(mode, component)}
    </div>
}