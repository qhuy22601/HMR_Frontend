import { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { backend } from "../../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SettingsPassword = () => {
    const [id, setId] = useState(localStorage.getItem("Id"));

  const [values, setValues] = useState({
    password: "",
    id: id,
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);


  function toastSuccess(message) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  function toastWarning(message) {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  async function changePass(){
    try {
      const res =axios.post(
        `${process.env.REACT_APP_BACK_END}/api/auth/changePass`,
        values
      );
      if (res.status === 200) {
        // message.success("Checkout Successfully");
        toastSuccess("Change Password Successfully");
      } else {
        // message.error("Checkout Failed");
        toastWarning("Change Password Failed");
      }
    } catch (error) {
      toastWarning("SomeThingWrong: " + error);
    }
  }

  return (
    <form onSubmit={changePass}>
      <ToastContainer></ToastContainer>
      <Card>
        <CardHeader subheader="Chỉnh sửa ở đây" title="Mật khẩu" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Mật khẩu"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Sửa
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
