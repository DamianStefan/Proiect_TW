import {
  Avatar,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BugCard from "../components/BugCard";
import LocalStorage from "../utils/localStorage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { api } from "../utils/api";

export default function ListBugsPage() {
  const [user, setUser] = useState(LocalStorage.getUser());
  const [users, setUsers] = useState();
  const [bugs, setBugs] = useState();
  const [currentProject, setCurrentProject] = useState();
  const [projectMembers, setProjectMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const idProject = parseFloat(useParams().idProject);
  const history = useHistory();
  console.log(idProject);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (idProject) {
      api
        .get(`/bug/${idProject}/addBug`)
        .then((response) => {
          if (response.status === 200) {
            setBugs(response.data);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });

      api
        .get(`/user`)
        .then((response) => {
          if (response.status === 200) {
            LocalStorage.setUsers(response.data);
            setUsers(response.data);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });

      api
        .get(`/project/${idProject}`)
        .then((response) => {
          if (response.status === 200) {
            setCurrentProject(response.data);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [idProject]);

  useEffect(() => {
    let emails = [];
    currentProject &&
      currentProject.project_groups &&
      currentProject.project_groups.map((group) => {
        if (users) {
          users.map((user) => {
            if (group.idUser === user.idUser) {
              console.log("usssss", user.email);

              emails.push(user.email);
              console.log("usssss", projectMembers);
            }
          });
        }
      });
    //filter list from duplicates
    console.log("asd", projectMembers);
    if (emails) {
      setProjectMembers(Array.from(new Set(emails)));
    }
  }, [currentProject, users]);
  console.log("currentProject: ", currentProject);
  console.log("bugs", bugs);
  console.log("user", user);
  console.log("users", users);
  console.log("projectMembers", projectMembers);
  const onAddMember = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleSubmitAddMember = () => {
    event.preventDefault();
    console.log("asdaaaaaaaaaa");
    api
      .post(`/project/addMember`, {
        idUserAuth: user.idUser,
        idProject: idProject,
        idUser: selectedUser,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.status === 200) {
          setOpen(false);
          api
            .get(`/project/${idProject}`)
            .then((response) => {
              if (response.status === 200) {
                setCurrentProject(response.data);
              }
            })
            .catch((err) => {
              console.log(err.response);
            });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleSelectedUser = (event) => {
    setSelectedUser(event.target.value);
  };
  console.log(users);

  return (
    <div>
      <Typography gutterBottom variant="h3" component="div">
        Project members
      </Typography>
      <Box sx={{ display: "flex", gap: "4px" }}>
        {projectMembers &&
          projectMembers.map((member) => (
            <Avatar sx={{ marigin: "5px" }}>{member.substring(0, 2)}</Avatar>
          ))}
      </Box>

      <Typography gutterBottom variant="h2" component="div">
        <Grid container></Grid>
      </Typography>
      {user && user.role === "MP" && (
        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={onAddMember}
        >
          Add member
        </Button>
      )}
      <Typography gutterBottom variant="h3" component="div">
        Bugs
      </Typography>
      {user && user.role === "TST" && (
        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={() => history.push(`/projects/${idProject}/addBug`)}
        >
          Add bug
        </Button>
      )}

      <Grid container spacing={2} direction="column" sx={{ marginTop: 2 }}>
        {bugs &&
          bugs.map((bug, index) => {
            return (
              <Grid item xs={4}>
                <BugCard
                  id={bug.id}
                  status={bug.status}
                  description={bug.description}
                  commitLink={bug.commitLink}
                  severity={bug.severity}
                  priority={bug.priority}
                />
              </Grid>
            );
          })}
      </Grid>
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
            Alege membrul care vrei sa fie adaugat
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitAddMember}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  labelId="users"
                  select
                  id="users"
                  label="Users"
                  onChange={handleSelectedUser}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {users &&
                    users.map((user) => (
                      <option key={user.idUser} value={user.idUser}>
                        {user.email}
                      </option>
                    ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Adauga membru
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
