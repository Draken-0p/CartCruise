import path from "path";
import express, { application } from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan from "morgan";

dotenv.config({path:"backend/config/config.env"});

connectDB();

const app = express();


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// if (process.env.NODE_ENV === "Development") {
// app.use(morgan("dev"));
// }

const __dirname = path.resolve();


app.use(express.json());

app.use(notFound);

app.use(errorHandler);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "PRODUCTION") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
app.get("/", (req, res) => {
  res.send("Api is Running...");
});
// }

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
