import express from "express";
import apiLimiter from "../utils/rateLimiter.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { validateEventInput } from "../validations/eventInputValidation.js";
import {
  CreateEvent,
  DeleteEvent,
  GetAllEvents,
  GetSingleEvent,
} from "../controllers/eventController.js";
const eventRouter = express.Router();

eventRouter.post(
  "/",
  apiLimiter,
  validateEventInput,
  authenticateUser,
  CreateEvent
);
eventRouter.get("/", authenticateUser, GetAllEvents);
eventRouter.get("/:eventId", authenticateUser, GetSingleEvent);
eventRouter.delete("/:eventId", authenticateUser, DeleteEvent);
export default eventRouter;
