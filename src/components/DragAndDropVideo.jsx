import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import cuid from "cuid";
import axios from "api/axios";
import BackupIcon from "@mui/icons-material/Backup";
import PulseLoader from "react-spinners/PulseLoader";

export default function DragAndDropVideo({ title, handleVideo }) {
  const [fileList, setFileList] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    setLoading(true);
    try {
      console.log("reaching here...");
      const { data } = await axios.post("/uploadVideos", {
        videos: fileList,
      });
      // console.log(data);
      setLoading(false);
      handleVideo(data?.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    console.log("rejectFiles", rejectFiles);
    console.log("acceptedFiles", acceptedFiles);
    acceptedFiles.forEach((file) => {
      // convert a file to base 64..
      setVideos((prev) => [...prev, file]);
      const reader = new FileReader();
      //   raise the event
      reader.onload = () => {
        setFileList((prev) => [...prev, { id: cuid(), src: reader.result }]);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  useEffect(() => {
    console.log(fileList);
  }, [fileList]);
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: "video/*",
  });
  const files = videos.map((file) => (
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
      {videos.length > 0 && (
        <div className="image_container">{<ul>{files}</ul>}</div>
      )}
      {fileList.length > 0 && (
        <p onClick={handleUpload}>
          {" "}
          {loading ? (
            <PulseLoader color={"#F37A24"} loading={loading} size={5} />
          ) : (
            <span>Upload file</span>
          )}
        </p>
      )}
      {/* {loading && <p>uploading...</p>} */}
    </div>
  );
}
