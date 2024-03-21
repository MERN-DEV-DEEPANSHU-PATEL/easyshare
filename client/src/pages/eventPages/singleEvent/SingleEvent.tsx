import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Gallery from "../../../components/gallery/Gallery";
import { makeRequest } from "../../../hooks/usePrivateAxios";
import Spinner from "../../../components/Spinner";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import UploadImages from "../../../components/uploadImages/UploadImages";
import { useRecoilValue } from "recoil";
import userAtom from "../../../store/atoms/user";

const SingleEvent = () => {
  const { eventId } = useParams();
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    _id: eventId,
    eventName: "",
    userId: "",
    eventPoster: { url: "" },
    isPublic: false,
    isFaceRecognition: true,
    uploadAccessKey: "",
    getAccessKey: "",
    recognizedPerson: [],
    mediaUrls: [],
    allMediaUrls: [],
    __v: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const getSingleEvent = useCallback(async () => {
    const { data } = await makeRequest.get(`/user/event/${eventId}`);
    setEvent(data);
    setIsLoading(false);
  }, [eventId]);

  const DeleteEvent = useCallback(async () => {
    await makeRequest.delete(`/user/event/${eventId}`);
    toast.done("Event Delete");
    navigate("/");
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      getSingleEvent();
    }
  }, [eventId]);

  return isLoading ? (
    <Spinner />
  ) : !event ? (
    <h1>
      Please Wait Images are lodind from google drive ...... <Spinner />
    </h1>
  ) : (
    <div>
      <div className="container mx-auto my-10 shadow-2xl p-20">
        <div className="w-full flex flex-col items-center justify-center lg:w-[80%]  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-[100%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            className="object-cover w-full sm:w-[80%] rounded-t-lg md:h-auto md:w-[50%] md:rounded-none md:rounded-s-lg"
            src={event.eventPoster.url}
            alt=""
          />
          <div className="flex flex-col justify-between md:gap-10 p-4 leading-normal">
            <h5 className="mb-2 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              {event?.eventName ? event?.eventName : "Here Is The Event Name"}
            </h5>
            <p className="mb-3 font-normal text-4xl text-gray-700 dark:text-gray-400">
              Explore and Downlaod any Image
            </p>
            <p className="mb-3 font-normal text-xl text-gray-700 dark:text-gray-400">
              Share this Link to allow other to view full gallery <br />
              <Link
                className="mb-3 font-normal text-xl text-blue-700 dark:text-indigo-400"
                to={`/${eventId}/${event.getAccessKey}`}
              >
                Click here to copy
              </Link>
            </p>
            <p className="mb-3 font-normal text-xl text-gray-700 dark:text-gray-400">
              Share this Link to allow other to view own gallery <br />
              <Link
                className="mb-3 font-normal text-xl text-blue-700 dark:text-indigo-400"
                to={`/face-register?eventId=${eventId}&getAccessKey=${event.getAccessKey}`}
              >
                Click here to copy
              </Link>
            </p>

            <button
              type="button"
              className="text-6xl flex justify-center items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
              onClick={DeleteEvent}
            >
              Delete
              <MdDelete className="text-[5rem]" />
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10 shadow-2xl p-20">
        <h3 className="text-center text-5xl font-bold text-pink-600 shadow-2xl">
          Upload Your Images
        </h3>
        <p className="capitalize text-3xl  mt-8 text-center">
          fiels are optional you can choose one of then or both at a time
        </p>
        <div className="flex flex-col gap-5">
          <UploadImages isUserEvent={{ ...event, ...user }} />
        </div>
      </div>

      <div className="container mx-auto my-6">
        {event.getAccessKey ? (
          <Gallery eventId={eventId} getAccessKey={event.getAccessKey} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SingleEvent;
