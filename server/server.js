import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import notFoundMiddleWare from "./middlewares/notFound.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import userAuthRouter from "./routes/userAuthRoutes.js";
import mongoose from "mongoose";
import eventRouter from "./routes/eventRoutes.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import { uploadimage } from "./Imagekit.js";
import {
  UpdateDirectImageOfEvent,
  UpdateGDLinkOfEvent,
} from "./controllers/eventController.js";
import {
  UpdateMediaUrls,
  getAllMediaUrls,
} from "./controllers/eventMediaFunctions.js";
import multer from "multer";
import mediaRouter from "./routes/mediaRoutes.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.raw({ type: "image/*", limit: "20mb" }));
const upload = multer({ dest: "uploads/" });
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/auth/user", userAuthRouter);
app.use("/user/event", upload.single("image"), eventRouter);
app.use("/user/event/media", mediaRouter);
app.put("/user/event/media/links", UpdateGDLinkOfEvent);
app.put("/user/event/media/image", UpdateDirectImageOfEvent);
app.get("/user/event/media/images", getAllMediaUrls);
app.post("/media/upload", authenticateUser, uploadimage);
app.use("/test", UpdateMediaUrls);
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const start = async () => {
  console.log("hello");
  console.log(process.env.IMAGE_KIT_PUBLIC_KEY);
  console.log(process.env.IMAGE_KIT_PRIVATE_KEY);
  try {
    const port = process.env.PORT || 5000;

    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database Connected"))
      .catch((err) => console.log("errors", err));
    app.listen(port, () => {
      console.log("Server Started on " + port + " Port");
    });
  } catch (error) {
    console.log("DataBase Error" + error);
  }
};
console.log(process.env.IMAGE_KIT_PUBLIC_KEY);
start();
