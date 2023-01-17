import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { api } from "../utils/api";
import LocalStorage from "../utils/localStorage";

export default function AddProjectPage() {
  const [user, setUser] = useState(LocalStorage.getUser());
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api
      .post(`/project`, {
        idUser: user.idUser,
        repoName: data.get("repository"),
        status: "ACTIV",
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);

        if (response.status === 200) {
          history.push(`/projects`);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="repository"
            label="Repository name"
            name="repository"
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Adauga proiect nou
      </Button>
    </Box>
  );
}
