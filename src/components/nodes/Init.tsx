import { DragEventHandler } from "react";
import { InitTextNode } from "./Email/Init";
import { InitEmailNode } from "./Text/Init";
import { nodeType } from "../ChatbotFlowBuilder";

interface InitNode {
  onDragStart: DragEventHandler<HTMLDivElement>;
  type: nodeType;
}

const templates: Record<nodeType, React.FC> = {
  text: InitTextNode,
  email: InitEmailNode,
};

// this is wrapper to the skeleton templates, created so that one function handles drag start
export function PannelNode({ onDragStart, type }: InitNode) {
  const Node = templates[type];

  if (!Node) return null;

  return (
    <div draggable onDragStart={onDragStart}>
      <Node />
    </div>
  );
}
