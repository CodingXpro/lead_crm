// models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/databaseConnection.js";
import Role from "./userRole.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyID: {
      type: DataTypes.INTEGER, // Assuming companyID is an integer
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, // Corrected data type to string
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
    },
    roleId: {
      // Foreign key column
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role, // References the Role model
        key: "id", // References the id column in the Role model
      },
    },
  },
  { timestamps: true }
);

User.belongsTo(Role, { foreignKey: "roleId" });

export default User;
