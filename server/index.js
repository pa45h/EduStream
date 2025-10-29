const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const adminRoutes = require("./routes/Admin.route");
const userRoutes = require("./routes/User.route");
const courseRoutes = require("./routes/Course.route");
const profileRoutes = require("./routes/Profile.route");
const paymentRoutes = require("./routes/Payments.route");
const reachRoutes = require("./routes/Reach.route");

const database = require("./config/database.config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("./config/cloudinary.config");
const fileUpload = require("express-fileupload");

const helmet = require("helmet");
const morgan = require("morgan");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp",
  })
);

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", reachRoutes);

database.connectDB();
cloudinary.connectCloudinary();

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server is up and running...",
  });
});

app.listen(PORT, () => {
  console.log(`Backend App is running at :- ${process.env.FRONTEND_URL}`);
  console.log(
    `Frontend App is running at :- ${process.env.REACT_APP_BASE_URL}`
  );
});
