// middleware/authorization.js
import User from "../models/userModel.js";

export const requireRole = (role) => {
  return async (req, res, next) => {
    try {
      // Retrieve the user from the database based on their authentication information
      const user = await User.findByPk(req.userId); // Assuming req.userId is the user's ID retrieved during authentication

      if (user && user.role === role) {
        next();
      } else {
        res.status(403).send("Unauthorized");
      }
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};
