import User from "../models/User.mjs";

const index = async (req, res) => {
	try {
		const allUsers = await User.find();
		console.log(allUsers);
		return res.status(200).json(allUsers);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server error" });
	}
};

export { index };
