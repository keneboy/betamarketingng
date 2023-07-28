import BackupIcon from "@mui/icons-material/Backup";
import {  useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DropFileInput() {
  // target the image drop file using the use
  // const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  // const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  // const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  // const onDrop = () => wrapperRef.current.classList.remove("dragover");
  // handle the file

  const { getRootProps, getInputProps  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFileList(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  console.log(fileList);
  const images = fileList.map((file) => (
    <img
      img={file.preview}
      key={file.name}
      alt="imag"
      style={{ width: "20rem", height: "20rem" }}
    />
  ));

  return (
    <>
      <div
        className="image"
        // ref={wrapperRef}
        // onDragLeave={onDragLeave}
        // onDragEnter={onDragEnter}
        // onDrop={onDrop}
        {...getRootProps()}
      >
        <BackupIcon className="backup" />
        <p>Drag & drop files here</p>
        <input {...getInputProps()} />
      </div>
      {/* {FileList && FileList.length > 0 ? (
        <div className="drop_file_preview">
          <div className="drop_file_preview_title">Ready to Upload</div>
        </div>
      ) : (
        "hello world"
      )} */}
      {images}
    </>
  );
}
