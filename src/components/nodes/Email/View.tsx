import { NodeProps, Node, Position } from "@xyflow/react";
import { RiMailLine } from "@remixicon/react";
import { EmailNode } from "@/components/ChatbotFlowBuilder";
import CustomHandle from "@/components/CustomHandle";
import { memo } from "react";

type EmailNodeData = Node<EmailNode["data"]>;

function View({
  id,
  data,
  positionAbsoluteX,
  positionAbsoluteY,
  selected,
}: NodeProps<EmailNodeData>) {
  const allowConnection = data.body && data.receiver;
  return (
    <div
      className={`bg-white ${allowConnection ? "opacity-100" : "opacity-70"} `}
    >
      {allowConnection && (
        <CustomHandle position={Position.Left} type="target" />
      )}
      <div
        onClick={() =>
          data.onSelectNode({
            type: "email",
            data: data,
            id: id,
            position: { x: positionAbsoluteX, y: positionAbsoluteY },
          })
        }
        className={`w-72 rounded-md overflow-clip shadow-uniform ${
          selected ? "outline-2 outline-blue-700" : ""
        }`}
      >
        <div className="bg-blue-300 flex items-center justify-between px-3 py-1 font-medium text-sm">
          <p>Send Email</p>
          <RiMailLine size={18} />
        </div>

        <div className="py-2 px-3 min-h-10 text-sm space-y-2">
          {data.receiver ? (
            <>
              <div className="space-y-1 border-b border-b-gray-300 pb-2 ">
                <p className="text-gray-400">Recipient:</p>
                <p className="line-clamp-3">{data.receiver}</p>
              </div>
            </>
          ) : (
            <span className="text-xs text-gray-400">
              Email is empty, click on the node to create a one.
            </span>
          )}

          {data.subject && (
            <div className="space-y-1 border-b border-b-gray-300 pb-2 ">
              <p className="text-gray-400">Subject:</p>
              <p className="line-clamp-3">{data.subject}</p>
            </div>
          )}

          {data.body && (
            <div className="space-y-1  ">
              <p className="text-gray-400">Body:</p>
              <p className="line-clamp-3">{data.body}</p>
            </div>
          )}
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

export const ViewEmailNode = memo(View);
