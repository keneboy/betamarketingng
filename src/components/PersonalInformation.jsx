import { useDropzone } from "react-dropzone";
import { useForm, Controller } from "react-hook-form";
import { List, ListItem, TextField, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useState, useContext } from "react";
import axios from "api/axios";
import AuthContext from "Context/AuthProvider";

export default function PersonalInformation({ data }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
  } = useForm({});
  const { setUpdatePic, updatePic } = useContext(AuthContext);
  const { onChange, ...rest } = register("");
  const onSubmit = (data) => {};

  // handling the profile pic.......
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    acceptedFiles.forEach((file) => {
      // convert a file to base 64..
      const reader = new FileReader();
      //   raise the event
      reader.onload = () => {
        setFileList((prev) => [...prev, { src: reader.result }]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  useEffect(() => {
    reset({ consultantId: data?.id });
    // handle image upload via cloudinary...
    if (fileList.length > 0) {
      setLoading(true);
      const imageUpload = async () => {
        try {
          await axios.post(
            "/uploadPic",
            { images: fileList },
            {
              headers: {
                authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("consultantInfo"))?.[
                    "accessToken"
                  ]
                }`,
              },
            }
          );
          setLoading(false);
          setFileList([]);
          setUpdatePic((prevState) => prevState + 1);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      imageUpload();
    }
  }, [data, fileList]);

  return (
    <div className="personal_information">
      <h1>Personal Information</h1>
      <form className="personal" onSubmit={handleSubmit(onSubmit)}>
        <div className="form_image_wrapper">
          <div className="left">
            <List className="form_field">
              <ListItem>
                <Controller
                  name="consultantId"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-zA-Z0-9]{3,}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="consultantId"
                      label="Consultant Id"
                      inputProps={{ type: "text", readOnly: true }}
                      error={Boolean(errors.consultantId)}
                      helperText={
                        errors.consultantId
                          ? errors.consultantId.type === "pattern"
                            ? "consultant Id is not valid"
                            : "consultant Id is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="bio"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-zA-Z0-9]{3,}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="bio"
                      label="last Name"
                      inputProps={{ type: "text" }}
                      error={Boolean(errors.bio)}
                      helperText={
                        errors.bio
                          ? errors.bio.type === "pattern"
                            ? "biography is not valid"
                            : "biography is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
            </List>
          </div>
          <div className="right">
            <div className="profile">
              <div className="image">
                <img
                  src={data?.picture ? data?.picture : "/image/avatar.jpg"}
                  alt=""
                />
              </div>

              <div className="upload_icon">
                {loading && <CircularProgress />}
                <div className="button" {...getRootProps()}>
                  <CloudUploadIcon />
                  <span>Upload</span>
                  <input {...getInputProps()} />
                </div>
              </div>
              <p>
                For best results, use an image at least 128px by 128px in any
                image format
              </p>
            </div>
          </div>
        </div>

        {/* <ListItem>
          <Button
            variant="contained"
            type="submit"
            // color="inherit"
          >
            Save Changes
          </Button>
        </ListItem> */}
      </form>
    </div>
  );
}
