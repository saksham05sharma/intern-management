import User, { USER_ROLES } from "../models/User.mjs";

const editUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...updatedFields } = req.body;

        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });

        // check if the user is admin or the user is the same as the one being edited
        if (user.role !== USER_ROLES.ADMIN && req.user.id !== id)
            return res.status(403).json({ message: "Forbidden" });

        // update email only if admin is editing
        if (updatedFields.email) {
            if (user.role !== USER_ROLES.ADMIN)
                return res.status(403).json({ message: "To change email, contact an admin" });
            user.email = updatedFields.email;
        }
        if (updatedFields.name) user.name = updatedFields.name;
        if (updatedFields.password) user.password = updatedFields.password;
        if (updatedFields.phone) user.phone = updatedFields.phone;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        if (error.kind === "ObjectId")
            return res.status(400).json({ message: "Invalid user id" });
        return res.status(500).json({ message: "Internal Server error" });
    }
};

export { editUserData };