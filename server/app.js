import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/router.js";

dotenv.config();
const app = express();
const port = 8000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
	})
);

// Define a route
app.use(router);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
