"use client";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

const Comment = ({ props }) => {
  const [commentBy, setCommentBy] = useState({});
  useEffect(() => {
    fetchCommentBy();
  }, [setCommentBy]);
  return (
    <div className="my-2 p-2 bg-neutral-950 rounded-lg">
      <div className="flex items-center">
        {/* user profile who comment in this video */}
        <img
          src={commentBy.profileImg}
          className="w-10 h-10 rounded-full"
        ></img>
        <div className="m-2">
          <span className="">{commentBy.name} </span>
          <span className="opacity-50 font-extralight">
            . {format(props.createdAt)}
          </span>
        </div>
      </div>
      <hr className="opacity-50 mt-2"></hr>
      {/* actual comment */}
      <div className="text-zinc-400 opacity-80 text-sm">{props.comment}</div>
    </div>
  );
};

export default Comment;
