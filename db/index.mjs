import mongoose from "mongoose";
import { dbUri } from "../config/index.mjs";

const connect = async () => {
	return mongoose
		.connect(dbUri)
		.then(() => {
			console.log("Connected to MongoDB successfully.");
		})
		.catch((err) => {
			console.error(err.message);
			// eslint-disable-next-line no-undef
			process.exit(1); // If the MongoDB connection is not made, stop the server
		});
};

export default connect;
