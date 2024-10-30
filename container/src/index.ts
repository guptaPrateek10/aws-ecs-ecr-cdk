import * as express from "express";
import * as os from "os";
import dbConnect from "../dbConnect";
import userRoute from "../src/routes/userRoutes";
import categoryRoute from "../src/routes/categoryRoutes";
import productRoute from "../src/routes/productRoutes";
import { VerifyToken } from "./middleware/authMiddleware";
import fileUpload = require("express-fileupload");
require("dotenv").config();
const app = express();
app.use(
  express.json({
    limit: "10mb",
  })
);
// Configure file upload middleware
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    abortOnLimit: true,
    createParentPath: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
dbConnect();
app.get("/", (request, response) => {
  response.send(`Hi! ECS task ${os.hostname()} is reporting back! `);
});

app.get("/health", (req, res) => {
  res.sendStatus(200);
});
const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`The app is listening on port ${PORT}.`));

app.use("/api/users", userRoute);
app.use("/api/category", VerifyToken, categoryRoute);
app.use("/api/product", VerifyToken, productRoute);

// const fibonacciNumber = fibonacci(getRandomNumber() * 5);
// febbonaci calsulate for n
// function fibonacci(n: number): number {
//   if (n <= 1) {
//     return n;
//   }
//   return fibonacci(n - 1) + fibonacci(n - 2);
// }
// // random select 1 to 10
// function getRandomNumber(): number {
//   return Math.floor(Math.random() * 10);
// }
