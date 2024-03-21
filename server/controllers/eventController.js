import { StatusCodes } from "http-status-codes";
import EventModel from "../models/eventModel.js";
import {
  deleteBulkImageFromCDN,
  deleteImageFromCDN,
  uploadImageToCDN,
} from "../Imagekit.js";
import { UpdateMediaUrls } from "./eventMediaFunctions.js";
import { BadRequestError } from "../errors/customErrors.js";
export const CreateEvent = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  if (req.body.isPublic) {
    req.body.getAccessKey = "000000";
  }
  req.body.eventPoster = await uploadImageToCDN(req.file);
  req.body.userId = req.user.userId;
  const event = await EventModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ event, msg: "Event Created" });
};

export const GetSingleEvent = async (req, res) => {
  const event = await EventModel.findOne({ _id: req.params.eventId });
  return res.status(StatusCodes.OK).json(event);
};

export const GetAllEvents = async (req, res) => {
  const events = await EventModel.find({ userId: req.user.userId }).select(
    "eventName eventPoster _id"
  );
  res.status(StatusCodes.OK).json({ events, msg: "Successful" });
};

export const GetPublicEvent = async (req, res) => {
  const event = await EventModel.findOne({ _id: req.query.eventId });
  if (event.isPublic) {
    const { allMediaUrls, eventName } = event;
    res
      .status(StatusCodes.OK)
      .json({ event: { allMediaUrls, eventName }, msg: "Successful" });
  }
};

export const GetPrivateEvent = async (req, res) => {
  const event = await EventModel.findOne({ _id: req.query.eventId });
  if (!event.isPublic && event.getAccessKey === req.query.getAccessKey) {
    const { allMediaUrls, eventName } = event;
    res
      .status(StatusCodes.OK)
      .json({ event: { allMediaUrls, eventName }, msg: "Successful" });
  }
};

export const DeleteEvent = async (req, res) => {
  const event = await EventModel.findByIdAndDelete(req.params.eventId);
  let fileIds = [];
  const idArray = event.mediaUrls.forEach((uploader) => {
    if (uploader.isFreeHost == "true" && uploader.images) {
      uploader.images.forEach((image) => {
        fileIds.push(image.fileId);
      });
    }
  });
  if (fileIds.length > 0) {
    deleteBulkImageFromCDN(fileIds);
  }
  deleteImageFromCDN(event.eventPoster.fileId);
  const deletedevents = await EventModel.findByIdAndDelete(req.query.eventId);
  res.status(StatusCodes.OK).json({ msg: "Event Successfully Delete" });
};

export const UpdateGDLinkOfEvent = async (req, res) => {
  const { eventId, uploadAccessKey, ...other } = req.body;
  const event = await EventModel.findOne({ _id: eventId });
  try {
    if (event.uploadAccessKey === req.body.uploadAccessKey) {
      event.mediaUrls.push({ ...other });
      // UpdateMediaUrls(event);
      const updatedEvent = await event.save();
      return res.status(StatusCodes.OK).json({ msg: "Links Uploaded Done" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const UpdateDirectImageOfEvent = async (req, res) => {
  const { eventId, uploadAccessKey, ...other } = req.body;
  const event = await EventModel.findById(eventId);
  try {
    if (event.uploadAccessKey === uploadAccessKey) {
      const imgMetaData = await uploadImageToCDN(req.file);
      const alreadyUploader = event.mediaUrls.findIndex(
        (uploader) =>
          uploader.phoneNumber == req.body.phoneNumber &&
          uploader.isFreeHost == "true"
      );
      if (alreadyUploader == -1) {
        event.mediaUrls.push({ ...other, images: [imgMetaData] });
        console.log("image is uploaded 1st time");
      } else {
        console.log("image is uploaded 2ndst time");
        const updatedUploader = event.mediaUrls[alreadyUploader];
        updatedUploader.images.push(imgMetaData);
        event.mediaUrls[alreadyUploader] = updatedUploader;
        // event.mediaUrls[alreadyUploader].images.push(imgMetaData);
      }
      event.allMediaUrls.push(imgMetaData);
      await event.save();
      return res.status(StatusCodes.OK).json({ msg: "Links Uploaded Done" });
    } else {
      console.log("not access key");
    }
  } catch (error) {
    console.log(error);
  }
};
