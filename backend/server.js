import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from './config/db.js'
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


connectDb();

// Routes
app.use("/api/quiz", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
