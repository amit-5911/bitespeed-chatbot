import { EmailNode } from "../../ChatbotFlowBuilder";
import { Button } from "../../Button";
import { FormEvent, memo, useState } from "react";
import { BaseEditProps } from "../Edit";

interface EmailProps extends BaseEditProps {
  node: EmailNode;
}

export const EditEmailNode = memo(({ node, onDiscard, onSave }: EmailProps) => {
  const [emailData, setEmailData] = useState(node.data);

  function handleOnSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave({ ...node, data: { ...node.data, ...emailData } });
  }
  return (
    <form className="group space-y-2 text-sm" onSubmit={handleOnSave}>
      <div className="space-y-2">
        <label htmlFor="reciver" className="text-gray-400 inline-block">
          Send To:
        </label>
        <div>
          <input
            id="reciver"
            value={emailData.receiver}
            onChange={(e) =>
              setEmailData({ ...emailData, receiver: e.target.value })
            }
            required
            type="email"
            placeholder="Recipient email... "
            className="border p-2 peer text-sm w-full border-gray-300 invalid:border-red-400 invalid:placeholder-shown:border-gray-500 focus-within:border-gray-500"
          />
          <p className="invisible text-xs peer-invalid:visible peer-invalid:peer-placeholder-shown:invisible peer-focus:invisible text-red-400 ">
            Email is not valid.
          </p>
        </div>
      </div>
      <div className="space-y-2 pb-2">
        <label htmlFor="subject" className="text-gray-400 inline-block">
          Subject
        </label>
        <div>
          <input
            id="subject"
            value={emailData.subject}
            onChange={(e) =>
              setEmailData({ ...emailData, subject: e.target.value })
            }
            type="text"
            placeholder="Subject..."
            className="border p-2 peer text-sm w-full border-gray-300  focus-within:border-gray-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="text-msg" className="text-gray-400 inline-block">
          Body
        </label>
        <div>
          <textarea
            id="email-body"
            value={emailData.body}
            onChange={(e) =>
              setEmailData({ ...emailData, body: e.target.value })
            }
            required
            rows={6}
            minLength={5}
            placeholder="Email body..."
            className="border p-2 peer text-sm w-full border-gray-300 invalid:border-red-400 invalid:placeholder-shown:border-gray-500 focus-within:border-gray-500"
          />
          <p className="invisible text-xs peer-invalid:visible peer-invalid:peer-placeholder-shown:invisible peer-focus:invisible text-red-400 ">
            Body length should be atleast 5 characters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <Button onClick={onDiscard}>Discard</Button>
        <Button
          type="submit"
          className="group-has-[textarea:invalid]:cursor-not-allowed group-has-[textarea:invalid]:opacity-40 group-has-[input:invalid]:opacity-40 group-has-[input:invalid]:cursor-not-allowed"
        >
          Save
        </Button>
      </div>
    </form>
  );
});

EditEmailNode.displayName = "EditEmailNode";
