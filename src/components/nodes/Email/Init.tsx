import { RiMessage2Line } from "@remixicon/react";

export function InitTextNode() {
  return (
    <div className="text-blue-800 border border-current px-4 py-3 flex flex-col opacity-70 hover:opacity-100 gap-2 justify-center items-center cursor-pointer rounded-sm ">
      <RiMessage2Line className="text-inherit" />
      <p className="text-sm">Message</p>
    </div>
  );
}
