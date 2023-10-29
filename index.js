import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/router.js";
import authRouter from "./routes/authRouter.js";
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

connectDb();

app.use(express.json());

app.use(cors());

app.use("/api/", router);

app.use("/api/auth/", authRouter);

app.get("/", (req, res)=>{
    res.send("Server running...");
});

app.listen(PORT, ()=>console.log("server is running on ",PORT));