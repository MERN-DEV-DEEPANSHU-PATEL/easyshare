import { useState } from "react";
import "./CreateEvent.scss";
import { makeRequest } from "../../../hooks/usePrivateAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [inputs, setInputs] = useState({
    eventName: "e.g. Goa Tour",
    isPublic: true,
    isFaceRecognition: false,
    uploadAccessKey: "123456",
    getAccessKey: "000000",
  });
  const navigate = useNavigate();
  const [eventPoster, setEventPoster] = useState<File | null>("");
  const [preview, setPreview] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === "select-one"
        ? e.target.value === "true"
        : e.target.value;

    setInputs((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEventPoster(e.target.files[0]);
      posterPreview(e.target.files[0]);
    }
  };

  const posterPreview = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", eventPoster);
      formData.append("eventName", inputs.eventName);
      formData.append("isPublic", inputs.isPublic);
      formData.append("isFaceRecognition", inputs.isFaceRecognition);
      formData.append("uploadAccessKey", inputs.uploadAccessKey);
      formData.append("getAccessKey", inputs.getAccessKey);
      const { data } = await makeRequest.post("/user/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(data.msg);
      navigate(`/event/${data.event._id}`);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="createEventPage">
      <div className="flex flex-col justify-center items-center">
        <form onSubmit={onSubmit} className="w-[50rem] shadow-custom p-10">
          <div className="mt-5">
            <label
              htmlFor="eventName"
              className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white"
            >
              Event name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g. Goa Tour"
              value={inputs.eventName}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="isFaceRecognition"
              className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white"
            >
              Face Recognition
            </label>
            <select
              id="isFaceRecognition"
              name="isFaceRecognition"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              value={inputs.isFaceRecognition.toString()} // Convert boolean to string
            >
              <option value="true">On</option>
              <option value="false">Off</option>
            </select>
          </div>

          <div className="mt-5">
            <label
              htmlFor="uploadAccessKey"
              className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white"
            >
              Upload AccessKey
            </label>
            <input
              type="text"
              id="uploadAccessKey"
              name="uploadAccessKey"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g. 123456"
              value={inputs.uploadAccessKey}
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="isPublic"
              className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white"
            >
              Make it
            </label>
            <select
              id="isPublic"
              name="isPublic"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>

          {!inputs.isPublic && (
            <div className="mt-5">
              <label
                htmlFor="getAccessKey"
                className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white"
              >
                Get AccessKey
              </label>
              <input
                type="text"
                id="getAccessKey"
                name="getAccessKey"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. 123456"
                value={inputs.getAccessKey}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="mt-5">
            <label
              htmlFor="eventPoster"
              className="block mb-2 text-4xl font-medium text-gray-900 dark:text-white"
            >
              Event Poster
            </label>
            <input
              type="file"
              id="eventPoster"
              name="eventPoster"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              accept="image/*"
              onChange={handlePosterChange}
            />
          </div>
          <div className="mt-5 flex justify-center">
            <img className="h-50" src={preview} alt="here poster preview" />
          </div>

          {/* Existing form button */}
          <button
            type="submit"
            className="mt-5 bg-pink-500 text-4xl hover:bg-pink-700 text-white font-bold py-4 px-6 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
