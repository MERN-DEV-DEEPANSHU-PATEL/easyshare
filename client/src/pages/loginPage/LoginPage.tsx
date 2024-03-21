import { useState } from "react";
import "./LoginPage.scss";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import userAtom from "../../store/atoms/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [inputs, setInputs] = useState({});
  const makeRequest = usePrivateAxios();
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    setInputs((prev: object) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await makeRequest.post("/auth/user/login", inputs);
      setUser({ user: data.user });
      toast.success("Login Successful");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="loginContainer">
      <div className="cardContainer">
        <img
          src="https://iili.io/JX50uKF.png"
          alt="easyshare"
          className="logo"
        />
        <div className="card">
          <h3 className="heading">login</h3>
          <form className="form">
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
                type="password"
                className="form-input"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
            </div>
            <button onClick={handleSubmit} className="submit btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
