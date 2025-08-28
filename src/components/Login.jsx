import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utlis/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utlis/constants";


const Login = () => {
  const [email, setEmail] = useState("vimal21082003@gmail.com");
  const [password, setPassword] = useState("Vimal..2123");
  const [error,setError]= useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data))
      navigate("/")  
    } catch (err) {
      setError(err.response.data)
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>
          <div>
            <label className="input validator">
              Email :
              <input
                type="email"
                placeholder="mail@site.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          <div className="mt-2">
            <label className="input validator">
              Passw :
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions">
            <button className="btn btn-primary mt-2 " onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
