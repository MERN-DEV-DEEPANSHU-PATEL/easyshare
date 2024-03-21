import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useRecoilState } from "recoil";
import userAtom from "./store/atoms/user";
import Spinner from "./components/Spinner";
import usePrivateAxios from "./hooks/usePrivateAxios";
import { useCallback, useEffect, useState } from "react";

const ProtectedRoute = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userState, setUser] = useRecoilState(userAtom);
  const makeRequest = usePrivateAxios();
  const getUser = async () => {
    try {
      const { data } = await makeRequest.get("/auth/user");
      console.log(data);
      setUser({ user: data.user });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUser("logout");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userState) {
      getUser();
    }

    return () => {
      if (userState) {
        setIsLoading(false);
      }
    };
  }, []);

  return isLoading ? (
    <Spinner />
  ) : userState !== "logout" ? (
    children
  ) : (
    <Navigate to={"/landing"} />
    // <h1>hello</h1>
  );
};

const Layout = () => {
  const location = useLocation();
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }, [window.scrollY, lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);
  return (
    <ProtectedRoute>
      <header className={`header header-${show}`}>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </ProtectedRoute>
  );
};

export default Layout;

export const UnAuthLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
