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
		phone: {
			type: String,
			required: false,
		},
		allowEdit: {
			type: Boolean,
			default: false,
		}
	},
	{ timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
