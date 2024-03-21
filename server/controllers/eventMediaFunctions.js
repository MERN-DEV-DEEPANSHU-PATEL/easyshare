import axios from "axios";
import { uploadImageToCDN } from "../Imagekit.js";
import { BadRequestError } from "../errors/customErrors.js";
import EventModel from "../models/eventModel.js";
import { createZip } from "../utils/downloadZip.js";
import { getImageLinks } from "../utils/mediaUrl.js";
export const UpdateMediaUrls = async (event) => {
  console.log("UpdateUrlsCall");
  try {
    const promises = event.mediaUrls[
      event.mediaUrls.length - 1
    ].googleDriveLink.map(async (link) => getImageLinks(link));
    const allMediaUrls = await Promise.all(promises);
    const newUrls = event.allMediaUrls.concat(allMediaUrls.flat());
    event.allMediaUrls = newUrls;
    await event.save();
    console.log("uploaded");
    console.log(event);
  } catch (error) {
    console.log(error);
  }
};

export const downloadImagesZip = async (req, res) => {
  try {
    const zip = await createZip(req.body.idArray);
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="downloaded_images.zip"'
    );
    zip.pipe(res);
  } catch (error) {
    console.error("Error creating zip file:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getUrls = async (event) => {
  let directLinks = [];
  let gDriveLinks = [];
  for (const uploader of event.mediaUrls) {
    if ((uploader.isFreeHost == "true") | (uploader.isFreeHost == true)) {
      console.log(uploader);
      console.log(directLinks);
      console.log(uploader.images);
      directLinks.push(uploader.images);
      console.log(directLinks);
    }
    if ((uploader.isGoogleDrive == "true") | (uploader.isGoogleDrive == true)) {
      let link = await Promise.all(
        uploader.googleDriveLink.map(async (link) => await getImageLinks(link))
      );
      gDriveLinks.push(link.flat());
    }
  }
  return gDriveLinks.flat().concat(directLinks.flat()).flat();
};

export const getAllMediaUrls = async (req, res) => {
  const { getAccessKey, eventId } = req.query;
  const event = await EventModel.findById(eventId);

  if (event.getAccessKey !== getAccessKey) {
    throw new BadRequestError("Invalid Access key");
  } else {
    const urls = await getUrls(event);
    res.status(200).send(urls);
  }
};

export const registerRecognize = async (req, res) => {
  const { fullName, phoneNumber } = req.body;
  const { eventId, getAccessKey } = req.query;
  const event = await EventModel.findById(eventId);
  if (event.getAccessKey !== getAccessKey) {
    throw new BadRequestError("invalid access key");
  }
  const image = await uploadImageToCDN(req.file);
  const personCode = Math.floor(100000 + Math.random() * 900000);
  console.log({ fullName, phoneNumber, image, personCode });
  const personIndex = event.recognizedPerson.push({
    fullName,
    phoneNumber,
    image,
    personCode,
    allImages: [],
  });
  await event.save();
  updateRecognizePerson(image, event, personIndex - 1);
  res.status(200).json({ personCode });
};

const updateRecognizePerson = async (person, event, personIndex) => {
  const imageUrls = await getUrls(event);

  for (const imageObj of imageUrls) {
    const res = await axios.post(
      "http://127.0.0.1:5000/face-recognize",
      { personImage: person, groupImage: imageObj },
      {
        headers: {
          "Content-Type": "application/json", // Set Content-Type header
        },
      }
    );
    console.log(res);
    if (res.data.match == "true") {
      event.recognizedPerson[personIndex].allImages.push(imageObj);
      await EventModel.findByIdAndUpdate(event._id, {
        recognizedPerson: event.recognizedPerson,
      });
      await event.save();
      console.log("matched i updated now");
    }
  }
};
