// models/Lead.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/databaseConnection.js";
import Industry from "./masterModel/industryModel.js";
import Keyword from "./masterModel/keyWordModel.js";

const Lead = sequelize.define(
  "Lead",
  {
    lead_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      startValue: 1, // Start auto-increment from 1 if no data present
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
      references: {
        model: Industry,
        key: "name",
      },
    },

    KeywordName: {
      type: DataTypes.STRING,
      references: {
        model: Keyword,
        key: "name",
      },
    },

    copyStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set default value to false
    },
  },
  { timestamps: true }
);

Lead.belongsTo(Industry, { foreignKey: "IndustryName" });
Lead.belongsTo(Keyword, { foreignKey: "KeywordName" });

export default Lead;
