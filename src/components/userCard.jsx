import React from "react";
import { BASE_URL } from "../utlis/constants";
import axios from "axios"
import { useDispatch } from "react-redux";
import {removeUserFromFeed} from "../utlis/feedSlice"


const UserCard = ({ feed = {} }) => {
  const { _id,firstName, lastName, photoUrl, skills, about, age, gender } =
    feed;
    const dispatch = useDispatch()

  const sendRequest = async (status,id) => {
    try {
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+id,{},{withCredentials:true})
      dispatch(removeUserFromFeed(id))
    } catch (err) {
      // 
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center p-4 ">
        <div className="card bg-base-300 w-96 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-700/50">
          {/* Profile Image Section */}
          <figure className="px-8 pt-8">
            <img
              src={photoUrl || "https://via.placeholder.com/150"}
              alt="profile"
              className="rounded-lg shadow-md"
            />
          </figure>

          <div className="card-body items-center text-center px-8 pb-8">
            {/* Name and Age */}
            <div className="mb-3">
              <h2 className="text-2xl font-bold text-white mb-2">
                {firstName || "Unknown"} {lastName || "User"}
              </h2>
              <div className="flex items-center justify-center gap-3">
                {age && (
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm font-medium">
                    {age} years
                  </span>
                )}
                {gender && (
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm font-medium">
                    {gender}
                  </span>
                )}
              </div>
            </div>

            {/* About Section */}
            {about && (
              <div className="mb-4 w-full">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {about}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {skills && (
              <div className="mb-6 w-full">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                    Skills
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {typeof skills === "string" ? (
                    skills.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))
                  ) : Array.isArray(skills) ? (
                    skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 bg-slate-700 text-slate-400 rounded-full text-xs">
                      {skills}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="card-actions w-full">
              <div className="flex gap-3 w-full">
                <button className="btn bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400 hover:text-red-300 flex-1 transition-all duration-200 group" onClick={()=>{sendRequest("ignored",_id)}}>
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Ignore
                </button>
                <button className="btn bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-400 hover:text-green-300 flex-1 transition-all duration-200 group" onClick={()=>{sendRequest("interested",_id)}}>
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Interested
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
