const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProjectGroup = sequelize.define("project_group", {
    idProject: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return ProjectGroup;
};
