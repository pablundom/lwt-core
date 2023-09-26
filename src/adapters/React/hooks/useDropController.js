import {useDrop} from "react-dnd";
import {useEffect} from "react";
import {useStateStore} from "./useStateStore.js";

const getIndex = (monitor, element) => {
    const dragOffset = monitor.getClientOffset();
    let index = 0;
    for (let [key, child] of [...element.children].entries()) {
        const boundingClientRect = child.getBoundingClientRect();
        if (dragOffset.y > boundingClientRect.y + (boundingClientRect.height / 2)) {
            index = key +1;
        }
    }
    return index;
}
export const useDropController = ({component, ref, ...props}) => {
    const store = useStateStore();
    const addChildItem = (data, index) => {
        const params = {data, component, index, store, ...props};
        if (data.id) {
            params.data = data;
            data?.parent?.hooks?.onMoveComponentOut && data?.parent?.hooks?.onMoveComponentOut({
                data: data,
                component: data.parent,
                index,
                store,
                ...props
            });
            component?.hooks?.onMoveComponentIn && component?.hooks?.onMoveComponentIn(params);
        } else {
            component?.hooks?.onAddComponent && component?.hooks?.onAddComponent(params);
        }
        store.updateSchema();

    }

    const [{canDrop, isOver, isOverCurrent, monitor}, drop] = useDrop(
        () => ({
            accept: 'component-builder',
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
                const i = {...item.component};
                const element = ref.current;
                let index = getIndex(monitor, element);
                addChildItem(i, index);
            },
        }),
        [],
    )


    return {drop, canDrop, isOver, isOverCurrent, monitor};
}