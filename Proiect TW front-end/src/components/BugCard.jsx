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
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import LocalStorage from "../utils/localStorage";
import { Box } from "@mui/system";
import { api } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function BugCard({
  id,
  description,
  commitLink,
  onClick,
  severity,
  priority,
  status,
}) {
  const [user, setUser] = React.useState(LocalStorage.getUser());
  const [open, setOpen] = React.useState(false);
  const [selectStatus, setSelectStatus] = React.useState("ACTIVE");
  const [assignedTo, setAssignedTo] = React.useState();
  const history = useHistory();
  const handleClose = () => setOpen(false);
  const handleChangeSelectStatus = (event) =>
    setSelectStatus(event.target.value);
  const handleCloseBug = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (user && user.idAllocatedBug === id) {
      setAssignedTo(user.email);
    }
  }, [user]);

  const handleAssignToMe = () => {
    api
      .get(`/bug/allocateBug?idBug=${id}&idUser=${user.idUser}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);

        if (response.status === 200) {
          user.idAllocatedBug = id;
          LocalStorage.rmUser();
          LocalStorage.setUser(user);
          history.go(0);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleSubmitCloseBug = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api
      .post(`/bug/closeBug`, {
        id: id,
        idUserAuth: user.idUser,
        commitLink: data.get("commitLink"),
        status: selectStatus,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);

        if (response.status === 200) {
          setOpen(false);
          history.go(0);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor:
            status === "ACTIV" ? "rgb(200,230,201)" : "rgb(255,205,210)",
        }}
      >
        <CardActionArea onClick={onClick}>
          <CardContent sx={{ display: "flex", padding: 4 }}>
            <Grid container spacing={2} direction="column">
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography gutterBottom variant="h6" component="div">
                    Description: {description}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" color="div">
                    Commit link: {commitLink}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" color="div">
                    Severity: {severity}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" color="div">
                    Priority: {priority}
                  </Typography>
                </Grid>{" "}
                <Grid item xs={2}>
                  <Typography variant="h6" color="div">
                    Status: {status}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h6" color="div">
                    Assigned to: {assignedTo ? assignedTo : "none"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {user.role === "MP" && status === "ACTIV" && (
            <>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                onClick={handleCloseBug}
              >
                Close Bug
              </Button>
              {user && user.idAllocatedBug !== id && (
                <Button
                  size="medium"
                  color="primary"
                  variant="contained"
                  onClick={handleAssignToMe}
                >
                  Assign to me
                </Button>
              )}
            </>
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
            Close
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitCloseBug}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="commitLink"
                  label="Commit Link"
                  name="commitLink"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="status"
                  select
                  label="Status"
                  value={selectStatus}
                  onChange={handleChangeSelectStatus}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Selecteaza status"
                >
                  <option key="ACTIV" value="ACTIV">
                    Active
                  </option>
                  <option key="CLOSED" value="CLOSED">
                    Closed
                  </option>
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Close bug
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
