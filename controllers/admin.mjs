import User, { USER_ROLES } from "../models/User.mjs";

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select("-password");
        let users = [];
        for (const user of allUsers) {
            if (user.role !== USER_ROLES.ADMIN || !user.verified) users.push(user);
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

const editUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...updatedFields } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.verified) return res.status(403).json({ message: "Forbidden" });

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { ...updatedFields },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        if (error.kind === "ObjectId")
            return res.status(400).json({ message: "Invalid user id" });
        return res.status(500).json({ message: "Internal Server error" });
    }
};

const userVerification = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { ...updatedFields } = req.body;

        if (updatedFields.verified) {
            if (user.role !== USER_ROLES.ADMIN)
                return res.status(403).json({ message: "Forbidden" });

            const updatedUser = await User.findByIdAndUpdate(
                id,
                { verified: true, role: updatedFields.role ? updatedFields.role : USER_ROLES.USER },
                { new: true }
            );
            return res.status(200).json({ message: "User verified", user: updatedUser });
        }
        else {
            if (user.role !== USER_ROLES.ADMIN)
                return res.status(403).json({ message: "Forbidden" });

            const updatedUser = await User.findByIdAndUpdate(
                id,
                { verified: false, role: USER_ROLES.USER },
                { new: true }
            );
            return res.status(200).json({ message: "User verification revoked", user: updatedUser });
        }
    } catch (error) {
        console.error(error);
        if (error.kind === "ObjectId")
            return res.status(400).json({ message: "Invalid user id" });
        return res.status(500).json({ message: "Internal Server error" });
    }
};

const allowUserToEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...updatedFields } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log(updatedFields);
        if (user.allowEdit && updatedFields.allowEdit)
            return res.status(400).json({ message: "User already allowed to edit" });

        if (!user.allowEdit && !updatedFields.allowEdit)
            return res.status(400).json({ message: "User already not allowed to edit" });

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { allowEdit: updatedFields.allowEdit !== undefined && updatedFields.allowEdit !== null ? updatedFields.allowEdit : true },
            { new: true }
        );
        return res.status(200).json({ message: updatedUser.allowEdit ? "User allowed to edit" : "User Edit permission revoked", user: updatedUser });
    } catch (error) {
        console.error(error);
        if (error.kind === "ObjectId")
            return res.status(400).json({ message: "Invalid user id" });
        return res.status(500).json({ message: "Internal Server error" });
    }
};

export { getAllUsers, editUserData, userVerification, allowUserToEdit };