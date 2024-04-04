import Role from "../models/userRole.js";

//Create the new Role

export const roleCreate = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const newRole = await Role.create({
      name,
    });

    res
      .status(201)
      .json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    // Handle errors
    console.error("Error during role creation:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// DELETE THE Role

export const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Delete the user
    await role.destroy();

    res.status(200).json({ message: "Role has been deleted." });
  } catch (err) {
    next(err);
  }
};

//GET ALL THE ROLE FORM DB
export const getAllRoles = async (req, res, next) => {
  try {
    // Fetch all leads
    const roles = await Role.findAll();

    // If there are no leads, return 404
    if (roles.length === 0) {
      return res.status(404).json({ message: "No role found" });
    }

    // If leads are found, return them
    res.status(200).json({ roles });
  } catch (err) {
    next(err);
  }
};
