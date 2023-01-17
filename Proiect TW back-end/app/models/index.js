const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logQueryParameters: true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize);

//Project
db.project = require("./project.model.js")(sequelize);
db.projectGroup = require("./projectGroup.model.js")(sequelize);
db.projectBug = require("./projectBug.model.js")(sequelize);

db.project.hasMany(db.projectGroup, { foreignKey: "idProject" });
db.project.hasMany(db.projectBug, { foreignKey: "idProject" });

module.exports = db;
