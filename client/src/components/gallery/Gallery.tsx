import React, { useState, useRef, useEffect } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import Img from "../Img";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross1, RxDownload } from "react-icons/rx";
import "./Gallery.scss";
import { makeRequest } from "../../hooks/usePrivateAxios";
import {
  handleDownload,
  handleDownloadZip,
} from "../../utils/HandleDownloadImage";

const Gallery = ({ eventId, getAccessKey }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const galleryRef = useRef(null);
  const [visibleImage, setVisibleImage] = useState(null);
  const viewBox = useRef(null);
  const [allMediaUrls, setAllMediaUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleToggleSelect = (imageId) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(imageId)) {
        return prevSelectedImages.filter((id) => id !== imageId);
      } else {
        return [...prevSelectedImages, imageId];
      }
    });
  };

  const getAllUrls = async () => {
    const { data } = await makeRequest.get(
      `/user/event/media/images?eventId=${eventId}&getAccessKey=${getAccessKey}`
    );
    setAllMediaUrls(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllUrls();
  }, []);

  return (
    <div className="">
      <div className="fixed z-[99999] top-10 left-1/2 transform -translate-x-1/2">
        {selectedImages.length > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownloadZip}
          >
            Download
          </button>
        )}
      </div>
      {isLoading ? (
        <h3>Loading....</h3>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" ref={galleryRef}>
          {allMediaUrls.map((image, index) =>
            image?.srcUrl ? (
              <div
                className="relative flex justify-center items-center"
                key={image.id}
              >
                <input
                  type="checkbox"
                  className="absolute top-0 right-0 mt-2 mr-2"
                  checked={selectedImages.includes()}
                  onChange={() => handleToggleSelect()}
                />
                <Img
                  src={image.srcUrl}
                  alt="Image Here"
                  className="h-auto cursor-pointer max-w-full rounded-lg"
                  onclick={() => setVisibleImage(index)}
                />
              </div>
            ) : (
              <div
                className="relative flex justify-center items-center"
                key={image.fileId}
              >
                <Img
                  src={image.url}
                  alt="Image Here"
                  className="h-auto cursor-pointer max-w-full rounded-lg"
                  onclick={() => setVisibleImage(index)}
                />
              </div>
            )
          )}
          <AnimatePresence>
            {allMediaUrls.length > 0 && visibleImage && (
              <motion.div
                ref={viewBox}
                id="fullView"
                className="fullView"
                layoutId={visibleImage}
              >
                <Img
                  className={""}
                  src={
                    allMediaUrls[visibleImage]?.srcUrl
                      ? allMediaUrls[visibleImage]?.srcUrl
                      : allMediaUrls[visibleImage].url
                  }
                  alt={"NLP Coaching"}
                />
                <div className="button flex gap-5">
                  <motion.button onClick={() => setVisibleImage(null)}>
                    <RxCross1 color="white" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDownload(allMediaUrls[visibleImage])}
                  >
                    <RxDownload color="white" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Gallery;
