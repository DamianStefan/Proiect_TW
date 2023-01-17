const db = require("../models");
const Project = db.project;
const ProjectGroup = db.projectGroup;
const ProjectBug = db.projectBug;
const User = db.user;

// Retrieve all from the database.
exports.findAll = (req, res) => {
  Project.findAll({
    include: [{ model: ProjectGroup }, { model: ProjectBug }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
      });
    });
};

// Find a single Project with an id
exports.findOne = (req, res) => {
  const idProject = req.params.idProject;

  Project.findByPk(idProject, { include: ["project_groups"] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Project with idProject=${idProject}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Project with idProject=" + idProject,
      });
    });
};

// Create and Save a new Project if you are MP
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const obj = {
    idUser: req.body.idUser,
    repoName: req.body.repoName,
    status: req.body.status,
  };
  try {
    const user = await User.findByPk(obj.idUser);
    if (user.role === "MP") {
      const project = await Project.create(obj);
      return res.status(200).send(project);
    } else {
      return res
        .status(500)
        .send({ error: "You don't have permission to create a Project!" });
    }
  } catch (err) {
    console.log(err, re.body);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Project.",
    });
  }
};

// Add members to a Project if you are MP
exports.addMember = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const obj = {
    idUserAuth: req.body.idUserAuth,
    idProject: req.body.idProject,
    idUser: req.body.idUser,
  };
  try {
    const user = await User.findByPk(obj.idUserAuth);
    if (user.role === "MP") {
      //if project group is not containing the user
      const projectGroup = await ProjectGroup.findAll({
        where: { idUser: obj.idUser, idProject: obj.idProject },
      });
      console.log(projectGroup);
      if (projectGroup.length === 0) {
        const created = await ProjectGroup.create(obj);
        return res.status(200).send(created);
      } else {
        return res.status(500).send({
          message: "Member exists",
        });
      }
    } else {
      return res.status(500).send({
        message: "You don't have permission to create a Project!",
      });
    }
  } catch (err) {
    console.log(err, req.body);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the member.",
    });
  }
};

// Join to project as a tester
exports.addTester = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const obj = {
    idProject: req.body.idProject,
    idUser: req.body.idUser,
  };
  try {
    const user = await User.findByPk(obj.idUser);
    if (user.role === "TST") {
      //if project group is not containing the user
      const projectGroup = await ProjectGroup.findAll({
        where: { idUser: obj.idUser, idProject: obj.idProject },
      });
      console.log(projectGroup);
      if (projectGroup.length === 0) {
        const created = await ProjectGroup.create(obj);
        return res.status(200).send(created);
      } else {
        return res.status(500).send({
          message: "Member exists",
        });
      }
    } else {
      return res.status(500).send({
        message: "You don't have permission to create a Project!",
      });
    }
  } catch (err) {
    console.log(err, req.body);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the member.",
    });
  }
};

// Update a Project by idPorject
exports.update = (req, res) => {
  const obj = {
    idUser: req.body.idUser,
    idProject: req.body.idProject,
    repoName: req.body.repoName,
    status: "ACTIV",
  };

  User.findByPk(obj.idUser)
    .then((user) => {
      if (user.role === "MP") {
        Project.update(obj, { where: { idProject: obj.idProject } })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Project was updated successfully.",
              });
            } else {
              res.send({
                message: `Cannot update Project with id=${obj.idProject}. Maybe Project was not found or req.body is empty!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Project with id=" + obj.idProject,
            });
          });
      } else {
        res
          .status(403)
          .send({ message: "You don't have permission to create a Project!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error  ",
      });
    });
};
