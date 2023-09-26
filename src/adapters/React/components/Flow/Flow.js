import {
    Controls,
    MiniMap,
    ReactFlow,
    useNodesState,
    addEdge,
    useEdgesState,
    Background,
    applyNodeChanges
} from "reactflow";
import {Box} from "@mui/material";
import 'reactflow/dist/style.css';
import {useCallback, useRef} from "react";
import {useFlowDropController} from "../../hooks/useFlowDropController.js";
import {v4 as uuidv4} from 'uuid';
const initialNodes = [
];
const initialEdges = [];
export const Flow = ({component, width, height, ...props}) => {
    const ref = useRef();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onAddElement = (e) => {
        const {component, position} = e;
        const node = {id: uuidv4(), position: position, data: {label: component.builder.name}};
        setNodes((nds) => nds.concat(node));
    }
    const {drop, canDrop, isOverCurrent, monitor} = useFlowDropController({component, ref: ref, onAddElement: onAddElement })
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    drop(ref);
    return <Box width={width} height={height} ref={ref}>
        <ReactFlow  nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}>
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
    </Box>
}