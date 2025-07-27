import { Button } from "./Button";

interface Props {
  handleSave: () => void;
  disbleSaveBtn: boolean;
}

export default function FlowHeader({ handleSave, disbleSaveBtn }: Props) {
  return (
    <div className="w-full flex items-center justify-between px-10 h-14 bg-gray-100  border-b border-b-gray-400">
      <div>
        <p>
          Contact:{" "}
          <a
            href="mailto:amitdhaterwal12@gmail.com"
            onClick={(e) => {
              if (e.currentTarget.textContent) {
                navigator.clipboard.writeText(e.currentTarget.textContent);
                alert("email copied on clipboard");
              }
            }}
            className="hover:underline text-blue-500 underline-offset-4"
          >
            amitdhaterwal12@gmail.com
          </a>
        </p>
      </div>
      <Button onClick={handleSave} disabled={disbleSaveBtn} className="px-6">
        Save changes
      </Button>
    </div>
  );
}
