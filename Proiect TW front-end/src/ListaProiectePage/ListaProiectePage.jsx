import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { api } from "../utils/api";
import LocalStorage from "../utils/localStorage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ListaProiectePage() {
  const [projects, setProjects] = useState();
  const history = useHistory();
  useEffect(() => {
    api
      .get("/project")
      .then((response) => {
        if (response.status === 200) {
          LocalStorage.setProjects(response.data);
          setProjects(response.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  console.log("project", projects);
  return (
    <Grid container spacing={2}>
      {projects &&
        projects.map((project, index) => {
          return (
            <Grid item xs={3}>
              <ProjectCard
                id={project.idProject}
                repoName={project.repoName}
                onClick={() => history.push(`/projects/${project.idProject}`)}
              />
            </Grid>
          );
        })}
    </Grid>
  );
}
