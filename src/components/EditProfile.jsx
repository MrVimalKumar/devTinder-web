import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utlis/userSlice";
import UserCard from "./userCard";
import { BASE_URL } from "../utlis/constants";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  // State variables for form inputs (initialize with current user data)
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const previewData = {
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
  };

  const handleSaveProfile = async () => {
    try {
      setError("");

      const profileData = {
        firstName,
        lastName,
        photoUrl,
        age: age ? parseInt(age) : undefined,
        gender,
        about,
        skills,
      };

      // Remove empty fields
      Object.keys(profileData).forEach((key) => {
        if (profileData[key] === "" || profileData[key] === undefined) {
          delete profileData[key];
        }
      });

      const res = await axios.patch(BASE_URL + "/profile/edit", profileData, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));

      // Show toast for 3 seconds
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-10">
      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-end z-50 mt-16 mr-4">
          <div className="alert alert-success shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-12 max-w-7xl mx-auto">
          {/* Edit Form Section */}
          <div className="flex justify-center w-full lg:w-auto">
            <div className="card bg-base-300 w-full max-w-lg shadow-xl">
              <div className="card-body p-8">
                <h2 className="card-title text-center text-2xl mb-8 text-base-content">
                  Edit Profile
                </h2>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* First Column - Basic Info */}
                  <div className="flex flex-col flex-1">
                    {/* First Name */}
                    <div className="form-control w-full mb-4">
                      <label className="label pb-2">
                        <span className="label-text font-medium">
                          First Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        className="input input-bordered w-full"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    {/* Last Name */}
                    <div className="form-control w-full mb-4">
                      <label className="label pb-2">
                        <span className="label-text font-medium">
                          Last Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        className="input input-bordered w-full"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    {/* Photo URL */}
                    <div className="form-control w-full mb-4">
                      <label className="label pb-2">
                        <span className="label-text font-medium">
                          Photo URL
                        </span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        className="input input-bordered w-full"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                      />
                    </div>
                    {/* Age */}
                    <div className="form-control w-full mb-4">
                      <label className="label pb-2">
                        <span className="label-text font-medium">Age</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Enter your age"
                        className="input input-bordered w-full"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="18"
                        max="100"
                      />
                    </div>
                  </div>
                  {/* Second Column - Additional Info */}
                  <div className="flex flex-col flex-1">
                    {/* Gender */}
                    <div className="form-control w-full mb-4">
                      <label className="label pb-2">
                        <span className="label-text font-medium">Gender</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {/* About */}
                    <div className="form-control w-full mb-4">
                      <label className="label pb-2">
                        <span className="label-text font-medium">About</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered h-24 resize-none w-full"
                        placeholder="Tell us about yourself..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        maxLength="300"
                      ></textarea>
                      <div className="flex justify-end pt-2">
                        <span className="text-sm text-base-content opacity-60">
                          {about.length}/300 characters
                        </span>
                      </div>
                    </div>
                    {/* Skills */}
                    <div className="form-control w-full mb-6">
                      <label className="label pb-2">
                        <span className="label-text font-medium">Skills</span>
                      </label>
                      <input
                        type="text"
                        placeholder="React, JavaScript, Node.js (comma separated)"
                        className="input input-bordered w-full"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      />
                      <div className="flex justify-start pt-2">
                        <span className="text-sm text-base-content opacity-60">
                          Separate skills with commas
                        </span>
                      </div>
                    </div>
                    {/* Empty div to balance the layout */}
                    <div className="form-control w-full mb-4"></div>
                  </div>
                </div>
                {/* Error Messages */}
                {error && <span className="text-red-500">{error}</span>}
                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    className="btn btn-outline px-8"
                    onClick={() => console.log("Cancel clicked")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary px-8"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Live Preview Section */}
          <div className="flex justify-center w-full lg:w-auto">
            <div className="w-full max-w-lg">
              <UserCard feed={previewData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
