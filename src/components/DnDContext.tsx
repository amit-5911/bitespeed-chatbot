import { createContext, ReactNode, use, useState } from "react";
import { nodeType } from "./ChatbotFlowBuilder";

const DnDContext = createContext<[nodeType | null, (type: nodeType) => void]>([
  null,
  () => {},
]);

// this provider will help communicate the node type from nodes panel to canvas,
// we can do some data-* binding for that as well, but it easer and can be extended when things start getting complex.
export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<nodeType | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = () => {
  const context = use(DnDContext);

  /** it should be catch at dev time. */
  if (!context) {
    throw new Error("dnd context read outside dnd provider.");
  }

  return context;
};
