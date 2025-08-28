import axios from "axios";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import { BASE_URL } from "../utlis/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utlis/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async() => {
    try {
      const res = await axios.get(BASE_URL + "/profile", { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
        if(err.status === 401){
            navigate("/login")
        }
      console.log(err.message);

    }
  };
  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
