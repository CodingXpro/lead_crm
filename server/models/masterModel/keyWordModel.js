// models/Keyword.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/databaseConnection.js";

const Keyword = sequelize.define(
  "Keyword",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true }
);

export default Keyword;
