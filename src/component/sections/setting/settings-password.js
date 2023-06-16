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



  async function changePass(){
    axios.post("/api/auth/changePass", values)
  }

  return (
    <form onSubmit={changePass}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Password"
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
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
