'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomNode from './CustomNode';

import 'reactflow/dist/style.css';
import './overview.css';
import HeaderSecond from '../components/header/header-second';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance: any) => console.log('flow loaded:', reactFlowInstance);

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const customNode = nodes.find((node) => node.type === 'custom');
      if (
        customNode &&
        customNode.data &&
        customNode.data.selects &&
        customNode.data.selects[edge.sourceHandle]
      ) {
        const edgeType = customNode.data.selects[edge.sourceHandle];
        edge.type = edgeType;
      }
    }

    return edge;
  });

  return (
    <>
      <HeaderSecond />
      <ReactFlow
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        className={'!min-h-[calc(100vh_-_112px)]'}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </>
  );
};

export default OverviewFlow;
