import User from "../models/User.mjs";

const editUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, phone } = req.body;

        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });

        // check if the user is admin or the user is the same as the one being edited
        if (req.user.role !== "admin" && req.user.id !== id)
            return res.status(403).json({ message: "Forbidden" });
        // update email only if admin is editing
        if (email) {
            if (req.user.role !== "admin")
                return res.status(403).json({ message: "To change email, contact an admin" });
            user.email = email;
        }
        if (name) user.name = name;
        if (password) user.password = password;
        if (phone) user.phone = phone;

        await user.save();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export { editUserData };