import mongoose from "mongoose";

export const USER_ROLES = {
	ADMIN: "admin",
	USER: "user",
};

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: Object.values(USER_ROLES),
			default: USER_ROLES.STUDENT,
		},
		avatar: {
			type: String,
			default:
				"https://raw.githubusercontent.com/akshatmittal61/mern-template/master/images/user.svg",
		},
		phone: {
			type: String,
			required: false,
		},
		bio: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
