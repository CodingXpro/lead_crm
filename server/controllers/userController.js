// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Assuming you have a User model defined
import Role from "../models/userRole.js";
import { sequelize } from "../config/databaseConnection.js";

//Register for the new User

export const register = async (req, res, next) => {
  try {
    const { companyID, name, email, phone, designation, role, password } =
      req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const [roleInstance] = await Promise.all([
      Role.findOrCreate({ where: { name: role } }),
    ]);

    const roleId = roleInstance[0].id;
    const maxUserId = await User.max("id");

    // Check if the table is empty
    const count = await User.count();
    const id = count > 0 ? maxUserId + 1 : 1;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      id,
      name,
      companyID,
      email,
      phone,
      designation,
      password: hashedPassword,
      roleId,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    // Handle errors
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Login for the User

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// UPDATE THE USER

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { companyID, name, email, password, role, phone, designation } =
      req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's fields
    if (companyID) {
      user.companyID = companyID;
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (designation) {
      user.designation = designation;
    }
    if (role) {
      user.role = role;
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    next(err);
  }
};

// DELETE THE USER

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.destroy();

    res.status(200).json({ message: "User has been deleted." });
  } catch (err) {
    next(err);
  }
};

//GET ALL THE USER FORM DB
export const getAllUsers = async (req, res, next) => {
  try {
    // Fetch all leads
    const users = await User.findAll();

    // If there are no leads, return 404
    if (users.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }

    // If leads are found, return them
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

export const getUsersCountPerRole = async (req, res) => {
  try {
    // Fetch all roles
    const roles = await Role.findAll();

    // Object to store user counts for each role along with role ID
    const userCounts = {};

    // Loop through each role and count users
    for (const role of roles) {
      const userCount = await User.count({
        where: { roleId: role.id },
      });
      userCounts[role.id] = {
        id: role.id,
        name: role.name,
        count: userCount,
      };
    }

    // Retrieve userCounts values as an array
    const userCountsArray = Object.values(userCounts);

    res.status(200).json({ user: userCountsArray });
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
};
