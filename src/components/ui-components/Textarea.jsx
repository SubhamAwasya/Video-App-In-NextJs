import { useMyContext } from "@/context/ContextProvider";
import React from "react";

function Textarea() {
  const { user } = useMyContext();
  // resizing textarea based on text present in text box
  function AutoResizingTextarea(event) {
    const textarea = event.target;
    if (textarea.scrollHeight > 300) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  async function addComment(e) {
    e.preventDefault();
    const comment = e.target.comment.value;
  }

  return (
    <div className="flex flex-col items-end pb-10">
      <form className="w-full" onSubmit={addComment}>
        <textarea
          maxLength="200"
          name="comment"
          placeholder={user ? "Add comment :" : "Login to add comment"}
          disabled={!user}
          onChange={(e) => {}}
          onInput={AutoResizingTextarea}
          className="textarea textarea-bordered w-full resize-none rounded-lg p-2 text-sm outline-none bg-primary"
        />
        {!user || (
          <button onClick={() => {}} className="btn btn-success mt-2">
            Comment
          </button>
        )}
      </form>
    </div>
  );
}

export default Textarea;
