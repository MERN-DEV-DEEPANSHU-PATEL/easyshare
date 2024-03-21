import { useState } from "react";
import { makeRequest } from "../../hooks/usePrivateAxios";
import { useLocation, useParams } from "react-router-dom";

const FaceRegister = () => {
  const [inputs, setInputs] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId");
  const getAccessKey = queryParams.get("getAccessKey");
  const handleChange = (e: any) => {
    if (e.target.type == "file") {
      console.log();
      setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(inputs.image);
    const formData = new FormData();
    formData.append("fullName", inputs.fullName);
    formData.append("phoneNumber", inputs.phoneNumber);
    formData.append("image", inputs.image);
    const { data } = await makeRequest.post(
      `/user/event/media/face-register?eventId=${eventId}&getAccessKey=${getAccessKey}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  return (
    <div className="container mx-auto py-10 p-10 max-w-7xl">
      <form onSubmit={onSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
            >
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1234567890"
              pattern="[0-9]{10}"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
              htmlFor="image"
            >
              Upload file
            </label>
            <input
              className="block w-full text-2xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleChange}
              required
            />
            <p
              className="mt-1 text-2xl text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG (MAX. 800x400px).
            </p>
          </div>
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FaceRegister;
