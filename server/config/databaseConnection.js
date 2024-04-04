import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "sequalizekris",
  "root",
  "", // <-- Provide your password here
  {
    host: "localhost",
    dialect: "mysql",
    define: {
      timestamps: true,
    },
  }
);
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected Successfully😍😍 !!");
  } catch (error) {
    console.error("Error in connecting to the database:", error);
  }
};
