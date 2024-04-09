import React from "react";
import Image from "next/image";

function FileInput(props) {
  return (
    <div className="flex flex-col w-fit gap-2 mb-2">
      {props.fileAccept === "video/*" ? (
        <span className="text-secondary">Upload Video :</span>
      ) : (
        <span className="text-secondary">Upload Thumbnail :</span>
      )}
      {props.fileAccept === "video/*"
        ? props.file && (
            <video
              className="video w-full h-full max-w-xs max-h-xs rounded-md"
              src={URL.createObjectURL(props.file)}
              controls
            ></video>
          )
        : props.file && (
            <Image
              src={URL.createObjectURL(props.file)}
              width={100}
              height={100}
              alt="Thumbnail"
              className="w-[320px] aspect-video rounded-md"
            />
          )}
      {props.percentage > 0 && props.percentage < 100 && (
        <progress
          className="progress progress-error w-full"
          value={props.percentage}
          max="100"
        ></progress>
      )}
      {props.percentage === "Upload Complete" && <div>Upload Complete</div>}
      <input
        id="videoFile"
        type="file"
        onChange={(e) => {
          props.setFile(e);
        }}
        accept={props.fileAccept}
        className="file-input file-input-bordered file-input-sm w-full max-w-xs"
      />
      {props.file && !props.percentage && (
        <button
          onClick={props.upload}
          className="btn btn-outline btn-success w-fit "
        >
          Upload
        </button>
      )}
    </div>
  );
}

export default FileInput;
