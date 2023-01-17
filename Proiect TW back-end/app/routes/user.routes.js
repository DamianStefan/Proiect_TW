module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Retrieve all Users
  router.get("/", user.findAll);

  // Create new User
  router.post("/", user.create);

  // Login User
  router.post("/login", user.login);

  // Update a User with id
  router.put("/:idUser", user.update);

  // Update a User with id
  router.delete("/:idUser", user.delete);

  app.use("/api/user", router);
};
