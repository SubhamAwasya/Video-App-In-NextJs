"use client";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/api/comment/get-comments/${videoId}`)
      .then((res) => res.json())
      .then((res) => {
        setComments(res.data);
      });
  }, []);

  if (comments == null) {
    return <div>Comments Loading...</div>;
  }
  // return comments && <div>{comments[0]?.comment}</div>;

  return (
    <>
      <h1>Comments :</h1>
      {comments.length == 0 ? (
        <h1>No Comments</h1>
      ) : (
        comments.map((c) => {
          return (
            <div className="my-2 p-2 bg-neutral-950 rounded-lg">
              <span className="opacity-50 font-extralight">
                {format(c.createdAt)}
              </span>
              <div className="text-sm">{c.comment}</div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Comments;
