const db = require("../models");
const ProjectBug = db.projectBug;
const User = db.user;

// Retrieve all Bugs from the database.
exports.findAll = (req, res) => {
  const idProject = req.params.idProject;
  ProjectBug.findAll({ where: { idProject: idProject } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bugs.",
      });
    });
};

// Create bug
exports.createBug = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const obj = {
    idProject: req.params.idProject,
    severity: req.body.severity,
    description: req.body.description,
    priority: req.body.priority,
    commitLink: req.body.commitLink,
    status: req.body.status,
  };

  // Save Project Bug in the database
  ProjectBug.create(obj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project Bug.",
      });
    });
};

// Close bug if you are MP
exports.closeBug = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const obj = {
    idUserAuth: req.body.idUserAuth,
    id: req.body.id,
    idProject: req.body.idProject,
    severity: req.body.severity,
    description: req.body.description,
    priority: req.body.priority,
    commitLink: req.body.commitLink,
    status: req.body.status,
  };

  try {
    const user = await User.findByPk(obj.idUserAuth);
    if (user.role === "MP") {
      //if project group is not containing the user
      const projectBug = await ProjectBug.update(obj, {
        where: { id: obj.id },
      });
      res.send(projectBug);
    } else {
      return res.status(500).send({
        message: "You don't have permission to close a Bug!",
      });
    }
  } catch (err) {
    console.log(err, req.body);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the member.",
    });
  }
};

//alocate bug
exports.allocateBug = async (req, res) => {
  const obj = {
    idBug: req.query.idBug,
    idUser: req.query.idUser,
  };
  console.log(obj);
  try {
    const user = await User.findByPk(obj.idUser);
    user.dataValues.idAllocatedBug = obj.idBug;
    console.log(user);
    const updateStatus = await User.update(user.dataValues, {
      where: { idUser: user.dataValues.idUser },
    });
    if (updateStatus == 1) {
      res.send({
        message: "User was updated successfully.",
      });
    } else {
      res.status(500).send({
        message: `Cannot update User with id=${obj.idUser}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the Project.",
    });
  }
};
