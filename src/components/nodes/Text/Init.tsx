import { RiMailLine } from "@remixicon/react";

// this is the skeletong you will drag from the nodes panel , hence named starts as init.
export function InitEmailNode() {
  return (
    <div className="text-blue-800 border border-current px-4 py-3 opacity-70 hover:opacity-100 flex flex-col gap-2 justify-center items-center cursor-pointer rounded-sm">
      <RiMailLine className="text-inherit" />
      <p className="text-sm">Email</p>
    </div>
  );
}
