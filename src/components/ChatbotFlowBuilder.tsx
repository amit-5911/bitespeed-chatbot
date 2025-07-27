"use client";

import React, { useCallback, DragEventHandler, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  OnConnect,
  MarkerType,
  Edge,
} from "@xyflow/react";

import type { XYPosition, Node, NodeProps } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { DnDProvider, useDnD } from "./DnDContext";
import SidePanel, { SidePanelType } from "./SidePanel";
import EmptyCanvasSkelton from "./EmptyCanvasSkelton";
import { ViewEmailNode } from "./nodes/Email/View";
import { ViewTextNode } from "./nodes/Text/View";
import FlowHeader from "./FlowHeader";

export type nodeType = "text" | "email";

interface BaseNode {
  id: string;
  type: nodeType;
  data: unknown;
  position: XYPosition;
}

export type TextNodeData = {
  label: string;
  message: string;
  onSelectNode: onSelectNode;
};

export type EmailNodeData = {
  label: string;
  receiver: string;
  subject: string;
  body: string;
  onSelectNode: onSelectNode;
};

type onSelectNode = (node: FlowNode) => void;

type NodeDataMap = {
  text: TextNodeData;
  email: EmailNodeData;
};

export interface TextNode extends BaseNode {
  type: "text";
  data: TextNodeData;
}

export interface EmailNode extends BaseNode {
  type: "email";
  data: EmailNodeData;
}

export type FlowNode = TextNode | EmailNode;

type CustomNodeTypes = {
  [K in nodeType]: React.FC<NodeProps<Node<NodeDataMap[K]>>>;
};

const customNodes: CustomNodeTypes = {
  email: ViewEmailNode,
  text: ViewTextNode,
};

const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 10,
    height: 10,
  },
  style: {
    strokeWidth: 2,
  },
};

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes: nodeType[] = ["text", "email"];

const DnDFlow = () => {
  const [currentPanel, setCurrentPanel] = useState<SidePanelType>({
    type: "NodePanel",
  });

  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    if (!event.dataTransfer) return null;

    event.dataTransfer.dropEffect = "move";
  }, []);

  // this will be called when user selects a node from canvas,
  // it basically manage currentPanel state
  const onSelectNode = useCallback(
    (node: FlowNode) => {
      const onSave = (node: FlowNode) => {
        setNodes((prevNodes) =>
          prevNodes.map((prevNode) =>
            prevNode.id === node.id ? node : prevNode
          )
        );
        setCurrentPanel({ type: "NodePanel" });
      };

      const onDiscard = () => setCurrentPanel({ type: "NodePanel" });

      setCurrentPanel({ type: "EditPanel", node, onDiscard, onSave });
    },
    [setCurrentPanel, setNodes]
  );

  const getNewFlowNode = useCallback(
    (
      type: BaseNode["type"],
      position: BaseNode["position"]
    ): FlowNode | null => {
      const obj = { id: getId(), position };
      if (type === "text") {
        return {
          ...obj,
          type,
          data: { label: "Message", message: "", onSelectNode },
        };
      } else if (type === "email") {
        return {
          ...obj,
          type,
          data: {
            label: "Email",
            receiver: "",
            subject: "",
            body: "",
            onSelectNode,
          },
        };
      }
      return null;
    },
    [onSelectNode]
  );

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = getNewFlowNode(type, position);

      if (!newNode) return;

      setNodes((nds) => nds.concat(newNode));

      // open the editpanel so that user can enter the text during creation phase
      onSelectNode(newNode);
    },
    [screenToFlowPosition, type, setNodes, onSelectNode, getNewFlowNode]
  );

  // this function doesn't check for the  data completeness of a node
  // to do that i would write the small data validation helper funcitons for each type and then check something like:
  // nodes.every(node => dataComplete(node) && participateInEdge(node));
  function handleSave() {
    if (nodes.length === 0) return;

    let isComplete = false;

    // if there is only one, considering the flow as complete
    if (nodes.length === 1) isComplete = true;
    else {
      isComplete = nodes.every((node) => {
        return edges.some((edge) =>
          [edge.source, edge.target].includes(node.id)
        );
      });
    }

    if (isComplete) alert("Flow Saved");
    else alert("Can't Save flow");
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <FlowHeader handleSave={handleSave} disbleSaveBtn={nodes.length < 1} />
      <div className="flex-1  flex ">
        <div className="flex-1 h-full">
          <div className="reactflow-wrapper h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={customNodes}
              defaultEdgeOptions={defaultEdgeOptions}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <Controls />
              {nodes.length === 0 && <EmptyCanvasSkelton />}

              {/** putting a layer over canvas to avoid the interactions, when the edit panel is open */}
              {currentPanel.type === "EditPanel" && (
                <div className="w-full h-full absolute opacity-40 bg-gray-300  z-[9999]  "></div>
              )}
            </ReactFlow>
          </div>
        </div>
        <div className="w-80 border-l border-l-gray-500">
          <SidePanel {...currentPanel} nodeTypes={nodeTypes} />
        </div>
      </div>
    </div>
  );
};

export default function ChatbotFlowBuilder() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
