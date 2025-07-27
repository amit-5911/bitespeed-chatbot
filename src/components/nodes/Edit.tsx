import { FlowNode } from "../ChatbotFlowBuilder";

export interface BaseEditProps {
  onSave: (node: FlowNode) => void;
  onDiscard: () => void;
  node: FlowNode;
}
