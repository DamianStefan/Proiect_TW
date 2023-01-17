const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProjectBug = sequelize.define("project_bug", {
    idProject: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    severity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commitLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return ProjectBug;
};
