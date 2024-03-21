import { SiEventstore } from "react-icons/si";
import "./Home.scss";
import { Link } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="home">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="m-7 p-12  shadow-custom flex flex-col justify-center items-center   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <SiEventstore className="mb-5 text-[20rem] sm:text-[15rem] font-bold tracking-tight text-gray-900 dark:text-white" />

          <Link to="/event/create">
            <h5 className="mb-7  text-5xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Start Sharing Media
            </h5>
          </Link>

          <Link
            to="/event/create"
            className="inline-flex items-center px-5 py-3 text-4xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create New Event
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
        <div className="m-7 p-12  shadow-custom flex flex-col justify-center items-center   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <MdTravelExplore className="mb-5 text-[20rem] sm:text-[15rem] font-bold tracking-tight text-gray-900 dark:text-white" />

          <Link to="/event">
            <h5 className="mb-7  text-5xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Explore Your Past Events
            </h5>
          </Link>

          <Link
            to="/event"
            className="inline-flex items-center px-5 py-3 text-4xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search Now
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
        <div className="m-7 p-12  shadow-custom flex flex-col justify-center items-center   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <IoSettingsOutline className="mb-5 text-[20rem] sm:text-[15rem] font-bold tracking-tight text-gray-900 dark:text-white" />

          <Link to="/event/create">
            <h5 className="mb-7  text-5xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Setting Up Your Account
            </h5>
          </Link>

          <Link
            to="/event/create"
            className="inline-flex items-center px-5 py-3 text-4xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Go To Profile
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
