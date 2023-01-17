module.exports = (app) => {
  const bug = require("../controllers/projectBug.controller.js");

  var router = require("express").Router();

  // Add bug to project
  router.post("/:idProject/addBug", bug.createBug);

  // Find all bugs
  router.get("/:idProject/addBug", bug.findAll);

  // Allocate bug
  router.get("/allocateBug", bug.allocateBug);

  // Close bug
  router.post("/closeBug", bug.closeBug);

  app.use("/api/bug", router);
};
