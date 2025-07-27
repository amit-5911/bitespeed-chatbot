import { TextNode } from "@/components/ChatbotFlowBuilder";
import CustomHandle from "@/components/CustomHandle";
import { RiWhatsappLine } from "@remixicon/react";
import { NodeProps, Node, Position } from "@xyflow/react";
import { memo } from "react";

type TextNodeData = Node<TextNode["data"]>;

// custom node which will be shown on the canvas once you dropped the skelton text node from nodes panel
// id, data and positions are added by us during creation of this nodes, other attributes are passed by react flow.
function View({
  id,
  data,
  positionAbsoluteX,
  positionAbsoluteY,
  selected,
}: NodeProps<TextNodeData>) {
  // without any message the connection won't be meaningfull (opinion!)
  const allowConnection = Boolean(data.message);
  return (
    <div
      className={`bg-white ${allowConnection ? "opacity-100" : "opacity-70"} `}
    >
      {allowConnection && (
        <CustomHandle position={Position.Left} type="target" />
      )}
      <div
        onClick={() =>
          //trigger when user selects the node, which will open the edit panel
          data.onSelectNode({
            type: "text",
            data: data,
            id: id,
            position: { x: positionAbsoluteX, y: positionAbsoluteY },
          })
        }
        className={`w-72 rounded-md overflow-clip shadow-uniform ${
          selected ? "outline-2 outline-blue-700" : ""
        }`}
      >
        <div className="bg-green-300 flex items-center justify-between px-3 py-1 font-medium text-sm">
          <p>Send Message</p>
          <RiWhatsappLine size={18} />
        </div>

        <div className="py-2 px-3 min-h-10">
          <p className="line-clamp-3 text-sm">
            {data.message || (
              <span className="text-xs text-gray-400">
                Message text is empty, click on the node to create a text.
              </span>
            )}
          </p>
        </div>
      </div>
      {allowConnection && (
        <CustomHandle
          type="source"
          connectionCount={1}
          position={Position.Right}
        />
      )}
    </div>
  );
}

export const ViewTextNode = memo(View);
