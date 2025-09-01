import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utlis/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utlis/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/receive/" + status + "/" + _id,{},{withCredentials:true}
      );
      dispatch(removeRequest(_id))
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null; // still loading
  if (requests.length === 0) return <div>No Request found</div>;

  return (
    <div>
      <h1>Connections</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 w-80 flex-shrink-0"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {photoUrl && (
                  <img
                    src={photoUrl}
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                )}
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {firstName} {lastName}
                </h3>
              </div>
            </div>
            <div>
              <h3 className="text-gray-900">
                {age}, {gender}
              </h3>
              <button className="btn btn-primary" onClick={()=>reviewRequest("rejected",request._id)}>Rejected</button>
              <button className="btn btn-secondary"  onClick={()=>reviewRequest("accepted",request._id)}>Accepted</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
