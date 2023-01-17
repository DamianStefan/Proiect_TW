import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import LocalStorage from "../utils/localStorage";
import { api } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Box } from "@mui/system";

export default function ProjectCard({ id, repoName, onClick }) {
  const [user, setUser] = React.useState(LocalStorage.getUser());
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOnClickEdit = () => setOpen(true);
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api
      .post(`/project/update`, {
        idUser: user.idUser,
        idProject: id,
        repoName: data.get("repoName"),
      })
      .then((response) => {
        if (response.status === 200) {
          history.go(0);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={onClick}>
          <CardMedia
            component="img"
            height="140"
            image="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Rpository name: {repoName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID proiect {id}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {user && user.role === "MP" && (
            <Button size="small" color="primary" onClick={handleOnClickEdit}>
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editeaza proiectul
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="repoName"
                  label="Repo Name"
                  id="repoName"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Editeaza proiectul
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
