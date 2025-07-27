import React, { memo } from "react";
import { Handle, HandleProps, useNodeConnections } from "@xyflow/react";

type CustomHandleProps = HandleProps & {
  connectionCount?: number;
};

// created this so that we can limit the connectionCount, just a tiny reusable comp

function CustomHandle(props: CustomHandleProps) {
  const { type, connectionCount = Number.MAX_SAFE_INTEGER, ...rest } = props;

  const connections = useNodeConnections({
    handleType: type,
  });

  return (
    <Handle
      {...rest}
      type={type}
      isConnectable={connections.length < connectionCount}
      style={{ width: "10px", height: "10px" }}
    />
  );
}

export default memo(CustomHandle);
