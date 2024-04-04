// models/TargetTable.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/databaseConnection.js";
import Lead from "./leadModel.js";

const CopyTable = sequelize.define(
  "CopyTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Lead, // Assuming the Lead model is defined elsewhere
        key: "lead_id",
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    IndustryName: {
      type: DataTypes.STRING,
    },
    KeywordName: {
      type: DataTypes.STRING,
    },
  
  },
  { timestamps: true }
);

export default CopyTable;
