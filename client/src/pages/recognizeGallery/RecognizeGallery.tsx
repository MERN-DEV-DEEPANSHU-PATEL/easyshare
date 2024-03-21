import React from "react";

const RecognizeGallery = () => {
  return (
    <div className="recognizeGallery">
      <div className="container max-w-xl">
        <div className="card">
          <label
            className="block mb-2 text-3xl font-medium text-gray-900 dark:text-white"
            htmlFor="large_size"
          >
            Large file input
          </label>
          <input
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="large_size"
            type="file"
          />
        </div>
      </div>
    </div>
  );
};

export default RecognizeGallery;
