const validateEmail = (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email)
			return res.status(400).json({ message: "Email is required" });
		if (!email.includes("@") || !email.includes("."))
			return res.status(400).json({ message: "Invalid Email" });
		else if (email.indexOf("@") > email.indexOf("."))
			return res.status(400).json({ message: "Invalid Email" });
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const validatePassword = (req, res, next) => {
	try {
		const { password } = req.body;
		if (!password)
			return res.status(400).json({ message: "Password is required" });
		if (password.length < 6)
			return res.status(400).json({
				message: "Password should be atleast 6 characters long",
			});
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const validatePhone = (req, res, next) => {
	try {
		const { phone } = req.body;
		if (!phone)
			return res.status(400).json({ message: "Phone is required" });
		if (phone.length !== 10)
			return res.status(400).json({ message: "Invalid Phone Number" });
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export { validateEmail, validatePassword, validatePhone };
