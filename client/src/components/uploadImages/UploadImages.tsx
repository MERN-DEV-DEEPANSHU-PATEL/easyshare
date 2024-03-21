import { useEffect, useState } from "react";
import GoogleDrive from "./GoogleDrive";
import FreeHosted from "./FreeHosted";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../hooks/usePrivateAxios";
import { toast } from "react-toastify";
import axios from "axios";
import { convertImageToBase64 } from "../../utils/HandleDownloadImage";

const UploadImages = ({ isUserEvent = false }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(isUserEvent);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  console.log(eventId);
  const [inputs, setInputs] = useState({
    uploaderName: "",
    phoneNumber: "",
    isGoogleDrive: false,
    isFreeHost: false,
    googleDriveLink: [],
    freeHostImages: [],
  });

  const handleChange = (e) => {
    if (e.target.value == "isGoogleDrive") {
      setInputs((prev) => ({
        ...prev,
        isGoogleDrive: true,
        isFreeHost: false,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        isGoogleDrive: false,
        isFreeHost: true,
      }));
    }
  };
  useEffect(() => {
    if (isUserEvent && isUserEvent?.firstName) {
      console.log(isUserEvent);
      setInputs((prev) => ({
        ...prev,
        uploaderName:
          isUserEvent.user.firstName + " " + isUserEvent.user.lastName,
        phoneNumber: isUserEvent.user.phoneNumber,
      }));
    }
  }, [isUserEvent]);

  const uploadImage = async (formData) => {
    try {
      const response = await makeRequest.put(
        "/user/event/media/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progress);
          },
        }
      );
      setUploadedFiles((prevUploadedFiles) => [
        ...prevUploadedFiles,
        response.data.uploadedFile,
      ]);
      setProgress(0);
    } catch (error) {
      console.error("Error uploading file: ", error);
      setProgress(0);
    }
  };

  const onSubmitClick = async ({ gDriveLinks, images }) => {
    if (inputs.isGoogleDrive) {
      console.log("on parent", gDriveLinks);

      const { data } = await makeRequest.put("/user/event/media/links", {
        uploaderName: inputs.uploaderName,
        phoneNumber: inputs.phoneNumber,
        isGoogleDrive: inputs.isGoogleDrive,
        googleDriveLink: gDriveLinks,
        eventId,
        uploadAccessKey: isUserEvent.uploadAccessKey,
      });
      toast.success(data.msg);
    }
    if (inputs.isFreeHost) {
      console.log("i am here");
      try {
        for (const image of images) {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("eventId", eventId);
          formData.append("uploaderName", inputs.uploaderName);
          formData.append("phoneNumber", inputs.phoneNumber);
          formData.append("isFreeHost", inputs.isFreeHost);
          formData.append("uploadAccessKey", isUserEvent.uploadAccessKey);
          await uploadImage(formData);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center text-4xl">
      <div className="mx-auto mt-10 flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-x-32">
          <label className="text-black" htmlFor="uploadType">
            Choose Upload
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="uploadType"
              onChange={handleChange}
              value="isGoogleDrive"
              className="mr-2"
            />
            <span className="mr-6">Google Drive Folder Link</span>
            <input
              type="radio"
              name="uploadType"
              onChange={handleChange}
              value="isFreeHost"
              className="mr-2"
            />
            <span>local Storage</span>
          </div>
        </div>
        {inputs.isGoogleDrive && <GoogleDrive onSubmitClick={onSubmitClick} />}
        {inputs.isFreeHost && (
          <FreeHosted
            uploading={uploading}
            setUploading={setUploading}
            onSubmitClick={onSubmitClick}
          />
        )}
      </div>
    </div>
  );
};

export default UploadImages;
