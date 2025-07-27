import { TextNode } from "../../ChatbotFlowBuilder";
import { Button } from "../../Button";
import { FormEvent, memo, useState } from "react";
import { BaseEditProps } from "../Edit";

interface TextProps extends BaseEditProps {
  node: TextNode;
}

// this component will be renderd in edit panel when user selects a view node (see View.txt in the same directory)
// User can update or initilize the data they want to trigger using this component.
// for email it is similar concept , check @/components/nodes/Email/Edit.tsx
export const EditTextNode = memo(({ node, onDiscard, onSave }: TextProps) => {
  const [text, setText] = useState(node.data.message);

  function handleOnSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave({ ...node, data: { ...node.data, message: text } });
  }
  return (
    <form className="group space-y-2" onSubmit={handleOnSave}>
      <label htmlFor="text-msg" className="text-gray-400 inline-block">
        Text
      </label>

      <div>
        <textarea
          id="text-msg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={6}
          minLength={5}
          placeholder="enter text"
          className="border p-2 peer text-sm w-full border-gray-300 invalid:border-red-400 invalid:placeholder-shown:border-gray-500 focus-within:border-gray-500"
        />
        <p className="invisible text-xs peer-invalid:visible peer-invalid:peer-placeholder-shown:invisible peer-focus:invisible text-red-400 ">
          Message length should be atleast 5 characters.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onDiscard}>Discard</Button>
        <Button
          type="submit"
          className="group-has-[textarea:invalid]:cursor-not-allowed group-has-[textarea:invalid]:opacity-40"
        >
          Save
        </Button>
      </div>
    </form>
  );
});

EditTextNode.displayName = "EditTextNode";
