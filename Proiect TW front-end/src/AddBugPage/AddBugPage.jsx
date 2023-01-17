import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function AddBugPage() {
  const idProject = parseFloat(useParams().idProject);
  const [severity, setSeverity] = React.useState("LOW");
  const [priority, setPriority] = React.useState("LOW");
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api
      .post(`/bug/${idProject}/addBug`, {
        idProject: idProject,
        description: data.get("description"),
        commitLink: data.get("commitLink"),
        priority: priority,
        severity: severity,
        status: "ACTIV",
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);

        if (response.status === 200) {
          history.push(`/projects/${idProject}`);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeSeverity = (event) => {
    setSeverity(event.target.value);
  };
  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="commitLink"
            label="Commit Link"
            id="commitLink"
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="priority">Priority</InputLabel>
          <Select
            labelId="priority"
            id="priority"
            label="Priority"
            value={priority}
            onChange={handleChangePriority}
          >
            <MenuItem value={"LOW"}>Low</MenuItem>
            <MenuItem value={"MEDIUM"}>Medium</MenuItem>
            <MenuItem value={"HIGH"}>High</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="severity">Severity</InputLabel>
          <Select
            labelId="severity"
            id="severity"
            label="Severity"
            value={severity}
            onChange={handleChangeSeverity}
          >
            <MenuItem value={"LOW"}>Low</MenuItem>
            <MenuItem value={"MINOR"}>Minor</MenuItem>
            <MenuItem value={"MAJOR"}>Major</MenuItem>
            <MenuItem value={"CRITICAL"}>Critical</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
}
