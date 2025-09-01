import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utlis/constants";
import { addFeed } from "../utlis/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store=>store.feed)
  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log(res.data)
    } catch (err) {
      // error
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);

  return feed && (
    <div>
      <UserCard feed={feed[0]}/>
    </div>
  );
};

export default Feed;
