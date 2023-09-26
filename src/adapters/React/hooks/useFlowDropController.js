import {useDrop} from "react-dnd";
import {useEffect} from "react";
import {useStateStore} from "./useStateStore.js";


/***
 *
 * @param component
 * @param {Object} ref
 * @param {HTMLElement} ref.current
 * @param onAddElement
 * @param props
 */
export const useFlowDropController = ({component, ref, onAddElement, ...props}) => {
    const store = useStateStore();

    const [{canDrop, isOver, isOverCurrent, monitor}, drop] = useDrop(
        () => ({
            accept: 'flow',
            hover: (item, monitor) => {

            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({shallow: true}),
                canDrop: monitor.canDrop(),
                monitor: monitor
            }),
            drop: (item, monitor) => {
                const dragOffset = monitor.getClientOffset();
                if (!dragOffset) {
                    return;
                }
                const position = {
                    x: Math.max((monitor.getClientOffset().x - ref.current.getBoundingClientRect().x) - 52,0),
                    y: Math.max((monitor.getClientOffset().y - ref.current.getBoundingClientRect().y) + 2, 0)
                }
                onAddElement({component: item.component, position: position});
            },
        }),
        [],
    )


    return {drop, canDrop, isOver, isOverCurrent, monitor};
}