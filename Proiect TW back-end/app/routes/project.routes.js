module.exports = (app) => {
  const project = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Create project
  router.post("/", project.create);

  // Retrieve all
  router.get("/", project.findAll);

  // Get one
  router.get("/:idProject", project.findOne);

  // Update one
  router.post("/update", project.update);

  // Add member to project if you are MP
  router.post("/addMember", project.addMember);

  // Join to project as a tester
  router.post("/addTester", project.addTester);

  app.use("/api/project", router);
};
