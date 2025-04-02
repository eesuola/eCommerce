import connectDB from "./db/connect.js";
import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import registrationRoute from "./routes/authentication.js";

configDotenv();




const connectionString= process.env.MONGO_URI
const PORT = 3000;
const app = express();
app.use(express.json());
app.use("/auth", registrationRoute);
app.use(cors());

const HOST = "localhost";



app.get("/", (req, res) => {
  res.send("Hello World!");
});






app.listen(PORT, HOST, async () => {
    await connectDB(connectionString)
    console.log(`Server is running on http://${HOST}:${PORT}`);
});



