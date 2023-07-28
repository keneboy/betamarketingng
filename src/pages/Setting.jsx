import { useForm, Controller } from "react-hook-form";
import { List, ListItem, TextField, Button } from "@mui/material";

export default function Setting() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();
  const { onChange, ...rest } = register("");
  const onSubmit = (data) => {};
  return (
    <div className="editAccountPage">
      <h1>Details</h1>
      <form
        className="forgetPassword_right_main"
        onSubmit={handleSubmit(onSubmit)}
      >
        <List>
          <div className="list_wrapper">
            <ListItem>
              <Controller
                name="first_Name"
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
                    id="first_Name"
                    label="First Name"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.first_Name)}
                    helperText={
                      errors.first_Name
                        ? errors.first_Name.type === "pattern"
                          ? "first Name is not valid"
                          : "first Name is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="last_Name"
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
                    id="last_Name"
                    label="last Name"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.last_Name)}
                    helperText={
                      errors.last_Name
                        ? errors.last_Name.type === "pattern"
                          ? "last Name is not valid"
                          : "last Name is required"
                        : ""
                    }
                    {...field}
                    style={{ color: "red", fontSize: "2rem" }}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
          </div>
          <div className="list_wrapper">
            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    inputProps={{ type: "email" }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === "pattern"
                          ? "email is not valid"
                          : "email is required"
                        : ""
                    }
                    {...field}
                    style={{ color: "red", fontSize: "2rem" }}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[0-9]{11}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.phone)}
                    helperText={
                      errors.phone
                        ? errors.phone.type === "pattern"
                          ? "Phone Number is not valid"
                          : "Phone Number is required"
                        : ""
                    }
                    {...field}
                    style={{ color: "red", fontSize: "2rem" }}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
          </div>
          <div className="list_wrapper">
            <ListItem>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[0-9]{11}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.phone)}
                    helperText={
                      errors.phone
                        ? errors.phone.type === "pattern"
                          ? "Phone Number is not valid"
                          : "Phone Number is required"
                        : ""
                    }
                    {...field}
                    style={{ color: "red", fontSize: "2rem" }}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[0-9]{11}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.phone)}
                    helperText={
                      errors.phone
                        ? errors.phone.type === "pattern"
                          ? "Phone Number is not valid"
                          : "Phone Number is required"
                        : ""
                    }
                    {...field}
                    style={{ color: "red", fontSize: "2rem" }}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
          </div>

          <ListItem>
            <Button
              variant="contained"
              type="submit"
              // color="inherit"
              style={{
                background: "blue",
                borderRadius: "1rem",
                width: "100%",
                height: 50,
                fontSize: 16,
                textTransform: "capitalize",
              }}
            >
              Save
            </Button>
          </ListItem>
        </List>
      </form>
    </div>
  );
}
