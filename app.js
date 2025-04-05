import connectDB from "./db/connect.js";
import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import registrationRoute from "./routes/authentication.js";
import { checkToken } from "./middleware/token.js";
import adminRoutes from "./routes/admin.js";
import productsRoute from "./routes/products.js";
import cartsRoute from "./routes/cart.js";
import { logToTerminal } from "./middleware/terminal.js";
import orderRoute from "./routes/order.js";
import categoryRoute from "./routes/category.js";

configDotenv();

const connectionString = process.env.MONGO_URI;
const PORT = 3000;
const app = express();
app.use(express.json());
app.use("/auth", logToTerminal, registrationRoute);
app.use(cors());
app.use("/", productsRoute);
app.use("/", cartsRoute);
app.use("/", categoryRoute);
app.use("/", orderRoute);
app.use("/admin", checkToken, adminRoutes);

const HOST = "localhost";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, HOST, async () => {
  await connectDB(connectionString);
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
