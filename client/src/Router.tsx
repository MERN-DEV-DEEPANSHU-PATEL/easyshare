import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Layout, { UnAuthLayout } from "./Layout";
import NotFound from "./pages/notFoundPage/404NotFound";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import LandingPage from "./pages/landingPage/LandingPage";
import CreateEvent from "./pages/eventPages/createEvent/CreateEvent";
import SingleEvent from "./pages/eventPages/singleEvent/SingleEvent";
import GetAllEvent from "./pages/eventPages/getAllEvent/GetAllEvent";
import RecognizeGallery from "./pages/recognizeGallery/RecognizeGallery";
import FaceRegister from "./pages/regsiterForFace/FaceRegister";
import GetGallery from "./pages/getGallery/GetGallery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/event",
        element: <GetAllEvent />,
      },
      {
        path: "/event/create",
        element: <CreateEvent />,
      },
      {
        path: "/event/:eventId",
        element: <SingleEvent />,
      },
    ],
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <UnAuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/signup",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/face-register/",
    element: <FaceRegister />,
  },
  {
    path: "/explore-gallery/",
    element: <RecognizeGallery />,
  },
  {
    path: "/:eventId/:getAccessKey",
    element: <GetGallery />,
  },
]);

export default router;
