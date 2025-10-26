import express from "express";
import dotenv from "dotenv";
import dbConnection from "./Config/dbConnection.js";
import loginSignup from "./Routes/loginSignup.js";
import profile from "./Routes/profile.js";
import provider from "./Routes/provider.js";
import renter from "./Routes/renter.js";
import history from "./Routes/history.js";
import payment from "./Routes/payment.js";
import platform from "./Routes/platform.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.options('*', cors());
//connect db
dbConnection();

app.options('*', cors()); // <-- Add this line before your routes

//mount router
app.use("/api/v1", loginSignup);
app.use("/api/v1", profile);
app.use("/api/v1", provider);
app.use("/api/v1", renter);
app.use("/api/v1", history);
app.use("/api/v1", payment);
app.use("/api/v1", platform);

//start server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})


