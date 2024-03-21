import { toast } from "react-toastify";
import "./RegisterPage.scss";
import { useState } from "react";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [inputs, setInputs] = useState({});
  const makeRequest = usePrivateAxios();
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    setInputs((prev: object) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await makeRequest.post("/auth/user/register", inputs);
      toast.success("Register Successful");
      navigate("/auth/login");
    } catch ({ response }: any) {
      console.log(response);
      toast.error(response.data.msg);
    }
  };
  return (
    <div className="RegisterContainer">
      <div className="cardContainer">
        <img
          src="https://iili.io/JX50uKF.png"
          alt="easyshare"
          className="logo"
        />
        <div className="card">
          <h3 className="heading">Registration Form</h3>
          <form className="form">
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                name="firstName"
                placeholder="First Name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                name="lastName"
                placeholder="Last Name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-input"
                name="phoneNumber"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button
                onClick={handleSubmit}
                type="submit"
                className="submit btn"
              >
                register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
