import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utlis/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utlis/constants";

const Login = () => {
  const [email, setEmail] = useState("sriram@gmail.com");
  const [password, setPassword] = useState("Sriram..00");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const handleSignUp = async () => {
    const res = await axios.post(
      BASE_URL + "/signup",
      { firstName, lastName, email, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data))
    navigate("/profile")
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
          {!isLogin && (
            <>
              <div>
                <label className="input validator">
                  FirstName :
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div>
                <label className="input validator">
                  Last Name :
                  <input
                    type="text"
                    placeholder="last Name"
                    required
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </label>
              </div>
            </>
          )}
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
            <button
              className="btn btn-primary mt-2 "
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "login" : "SignUp"}
            </button>
          </div>
          <p className="cursor-pointer" onClick={()=>{setIsLogin((value)=>(!value))}}>{isLogin? " New User, Sign Up ": " Existing User login "}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
