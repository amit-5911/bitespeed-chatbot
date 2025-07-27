import React, { DragEvent } from "react";
import { useDnD } from "./DnDContext";
import { PannelNode } from "./nodes/Init";
import type { BaseEditProps } from "./nodes/Edit";
import { RiArrowLeftLongLine } from "@remixicon/react";
import { EditTextNode } from "./nodes/Text/Edit";
import { EditEmailNode } from "./nodes/Email/Edit";
import { nodeType } from "./ChatbotFlowBuilder";

type onDragStart = (
  nodeType: nodeType
) => (event: DragEvent<HTMLDivElement>) => void;

interface NodePanel {
  type: "NodePanel";
}

interface EditPanel extends BaseEditProps {
  type: "EditPanel";
}

export type SidePanelType = NodePanel | EditPanel;

/**
 * There are two types of pannels,
 * 1. NodePanel: It holds all the initilization skeletons (which you drag and drop on the canvas)
 * 2. EditPanel: It renders the edit component for a node. Ex: when you select a text node in the canvas,
 *          this panel will show all the data fields required by text node, from there user can save or discard changes
 */

export default function SidePanel(
  props: SidePanelType & { nodeTypes: nodeType[] }
) {
  if (props.type === "NodePanel") {
    return (
      <div className="p-4">
        <NodesPanel nodeTypes={props.nodeTypes} />
      </div>
    );
  } else if (props.type === "EditPanel") {
    return (
      <div className=" px-4 space-y-4 ">
        <div className="border-b flex items-center border-b-gray-400 -mx-4 px-4 ">
          <button onClick={props.onDiscard} className="py-2 cursor-pointer ">
            <RiArrowLeftLongLine className="opacity-50 hover:opacity-100" />
          </button>
          <p className="font-medium w-fit m-auto">{props.node.data.label}</p>
        </div>
        <div className="">
          <EditPanel {...props} />
        </div>
      </div>
    );
  }
  return null;
}

function NodesPanel({ nodeTypes }: { nodeTypes: nodeType[] }) {
  const setType = useDnD()[1];

  const onDragStart: onDragStart = (nodeType) => (event) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className=" grid grid-cols-2 gap-2">
      {nodeTypes.map((type) => (
        <PannelNode key={type} onDragStart={onDragStart(type)} type={type} />
      ))}
    </aside>
  );
}

function EditPanel(props: BaseEditProps) {
  const { node, onSave, onDiscard } = props;
  if (node.type === "text") {
    return <EditTextNode node={node} onSave={onSave} onDiscard={onDiscard} />;
  } else if (node.type === "email") {
    return <EditEmailNode node={node} onSave={onSave} onDiscard={onDiscard} />;
  }

  return null;
}
