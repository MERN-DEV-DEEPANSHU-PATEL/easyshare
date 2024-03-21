import { useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userAtom from "../../store/atoms/user";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const makeRequest = usePrivateAxios();

  return (
    <nav className=" border-gray-200 w-full  bg-gradient-to-tr from-[#FF5F6D] to-[#FFC371] dark:bg-gradient-to-tr dark:from-transparent dark:to-transparent dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://iili.io/JX50uKF.png"
            className="w-[40rem] md:w-[30rem] "
            alt="EasyShare Logo"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-[5rem] h-[5rem] md:w-[4rem] md:h-[4rem] text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-full h-full"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${showDropdown ? "" : "hidden"} w-full`}
          id="navbar-hamburger"
        >
          <ul className="text-6xl md:text-4xl flex flex-col font-medium mt-4 rounded-lg bg-transparent dark:bg-gray-800 dark:border-gray-700">
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={async () => {
                  await makeRequest.get("/auth/user/logout");
                  setUser("logout");
                  navigate("/landing");
                }}
                className="block w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
