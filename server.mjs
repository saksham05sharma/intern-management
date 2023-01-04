import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { PORT } from "./config/index.mjs";

import apiIndex from "./routes/index.mjs";
import connect from "./db/index.mjs";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

config();
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiIndex);

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "production") {
	app.use(express.static("build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
} // Serve the build files if the app is in production mode

app.listen(PORT, () => {
	connect();
	console.info(`Server started at port ${PORT}`);
});
