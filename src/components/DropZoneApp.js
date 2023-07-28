import Dropzone from "components/Dropzone";
import { useCallback, useState } from "react"
import BackupIcon from "@mui/icons-material/Backup";
import "./dropzone.css"
import cuid from "cuid";
import ImageGride from "components/ImageGride";
function DropZoneApp() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <main className="drop">
      {/* <h1 className="text-center">Drag and Drop Test</h1> */}
      <BackupIcon className="backup" />
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      <ImageGride images={images} />
    </main>
  );
}

export default DropZoneApp;