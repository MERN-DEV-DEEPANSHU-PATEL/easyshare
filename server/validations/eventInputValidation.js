import { body } from "express-validator";
import { withValidationErrors } from "./allErrorMessages.js";
import { BadRequestError } from "../errors/customErrors.js";

export const validateEventInput = withValidationErrors([
  body("eventName")
    .notEmpty()
    .withMessage("Event name can not be empty")
    .isLength({ min: 3, max: 50 })
    .withMessage("Event name must be between 3 and 50 characters."),
  body("isPublic").isBoolean().withMessage("isPublic must be a boolean value."),
  body("isFaceRecognition")
    .isBoolean()
    .withMessage("isFaceRecognition must be a boolean value."),
  body("uploadAccessKey")
    .isString({ min: 6, max: 10 })
    .withMessage("Upload access key must be a 6-digit number."),
  body("getAccessKey")
    .isString({ min: 6, max: 10 })
    .withMessage("Get access key must be a 6-digit number."),
]);

export const validateEventMediaInput = withValidationErrors([
  body("mediaUrls")
    .isArray()
    .withMessage("Media URLs must be provided as an array."),
  body("mediaUrls.*.uploaderName")
    .isLength({ min: 3, max: 50 })
    .withMessage("Your name must be between 3 and 50 characters."),
  body("mediaUrls.*.phoneNumber")
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number format provided in mediaUrls."),
  body("mediaUrls.*.isGoogleDrive")
    .isBoolean()
    .withMessage("isGoogleDrive must be a boolean value."),
  body("mediaUrls.*.isFreeHost")
    .isBoolean()
    .withMessage("isFreeHost must be a boolean value."),
  body("mediaUrls.*.googleDriveLink")
    .isArray()
    .withMessage("Google Drive links must be provided as an array.")
    .custom((value) => value.length <= 5)
    .withMessage("Maximum 5 Google Drive links are allowed."),
  body("mediaUrls.*.googleDriveLink.*")
    .isLength({ max: 500 })
    .withMessage("Each Google Drive link must not exceed 500 characters."),
  body("mediaUrls.*.freeHostImages")
    .isArray()
    .withMessage("Free host images must be provided as an array.")
    .custom((value) => value.length <= 2000)
    .withMessage("Maximum 2000 items are allowed in free host images array."),
  body("mediaUrls.*.freeHostImages.*.baseUrl")
    .isURL()
    .withMessage("Invalid base URL provided in free host images."),
  body("mediaUrls.*.freeHostImages.*.idsName.*")
    .isLength({ min: 5, max: 50 })
    .withMessage("Image ID must be between 5 and 50 characters."),
]);
