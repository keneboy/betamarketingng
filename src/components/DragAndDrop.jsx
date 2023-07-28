import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import cuid from "cuid";
import axios from "api/axios";
import BackupIcon from "@mui/icons-material/Backup";
import PulseLoader from "react-spinners/PulseLoader";

export default function DragAndDrop({ title, handleFileList, fileList }) {
  // const [fileList, setFileList] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  // const handleUpload = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.post("/uploadImages", {
  //       images: fileList,
  //     });
  //     console.log(data);
  //     setLoading(false);
  //     handleImages(data?.message);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    console.log("rejectFiles", rejectFiles);
    console.log("acceptedFiles", acceptedFiles);
    acceptedFiles.forEach((file) => {
      setImages((prevState) =>
        [...prevState, file]?.filter(
          (v, i, a) => a.findIndex((item) => item["name"] === v["name"]) === i
        )
      );
      // convert a file to base 64..
      const reader = new FileReader();
      //   raise the event
      reader.onload = () => {
        // setFileList((prev) => [...prev, { id: cuid(), src: reader.result }]);

        handleFileList((prev) =>
          [...prev, { id: cuid(), src: reader.result }]?.filter(
            (v, i, a) => a.findIndex((item) => item["src"] === v["src"]) === i
          )
        );
      };
      reader.readAsDataURL(file);
    });
  }, []);
  useEffect(() => {
    console.log("filelist", fileList);
  }, [fileList]);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  const files = images.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <div className="dropzone_container">
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <BackupIcon className="back" />
        {isDragActive ? "Drag active" : `${title}`}
      </div>
      {images.length > 0 && (
        <div className="image_container">{<ul>{files}</ul>}</div>
      )}
      {/* {fileList.length > 0 && (
        <p onClick={handleUpload}>
          {" "}
          {loading ? (
            <PulseLoader color={"#F37A24"} loading={loading} size={5} />
          ) : (
            <span>Upload file</span>
          )}
        </p>
      )} */}
    </div>
  );
}
