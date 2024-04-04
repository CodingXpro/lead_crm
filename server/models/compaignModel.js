import { DataTypes } from "sequelize";
import { sequelize } from "../config/databaseConnection.js";

const Campaign = sequelize.define(
  "Campaign",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    campaign_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keyword_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    followup1: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set default value to false
    },
    followup1_time: {
      type: DataTypes.DATE,
    },
    followup2: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set default value to false
    },
    followup2_time: {
      type: DataTypes.DATE,
    },
    followup3: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set default value to false
    },
    followup3_time: {
      type: DataTypes.DATE,
    },
    followup4: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set default value to false
    },
    followup4_time: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

export default Campaign;
