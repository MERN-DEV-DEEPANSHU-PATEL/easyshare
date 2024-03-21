import express from "express";
import apiLimiter from "../utils/rateLimiter.js";
import { registerRecognize } from "../controllers/eventMediaFunctions.js";
const mediaRouter = express.Router();

mediaRouter.post("/face-register", apiLimiter, registerRecognize);
export default mediaRouter;
