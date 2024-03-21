import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./LandingPage.scss";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="custom-shape-divider-top-1708694488">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <img className="logo" src="https://iili.io/JX50uKF.png" alt="" />
      <div className="content">
        <div className="content-text">
          <div className="text">
            <p>Share your group media in easy and fast way</p>
            <div className="social">
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="content-img">
          <img src="https://iili.io/JX5GKSn.png" alt="landing icon" />
          <div className="buttons">
            <Link to={"/auth/signup"}>Signup</Link>
            <Link to={"/auth/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
