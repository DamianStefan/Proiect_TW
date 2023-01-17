const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Project = sequelize.define("project", {
    idProject: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    //Created by
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    repoName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Project;
};
