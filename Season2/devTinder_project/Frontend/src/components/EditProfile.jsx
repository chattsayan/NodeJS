import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photo, setPhoto] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      //   console.log(res?.data?.data);

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  const resetProfile = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setGender("");
    setAbout("");
    setError("");
  };

  return (
    <>
      <h2 className="font-bold text-2xl mb-5 text-center mt-7">Edit Profile</h2>
      <div className="flex items-center justify-center h-[454px]">
        <div className="border p-5 rounded-md border-gray-700 w-[900px]">
          <div className="flex gap-4 mb-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="text"
                className="grow"
                placeholder="Firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="text"
                className="grow"
                placeholder="Lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          <div className="flex gap-4 mb-4">
            <label className="form-control w-[50%]">
              <select
                className="select select-bordered"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </label>

            <label className="input input-bordered flex items-center gap-2 w-[50%]">
              <input
                type="number"
                className="grow"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </div>

          <label className="input input-bordered flex items-center gap-2 w-full mb-4">
            <input
              type="text"
              className="grow"
              placeholder="Photo URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </label>

          <textarea
            className="textarea textarea-bordered w-full mb-3"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex gap-3">
            <button className="btn btn-success" onClick={saveProfile}>
              Save Profile
            </button>
            <button className="btn btn-warning" onClick={resetProfile}>
              Reset
            </button>
          </div>
        </div>

        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile update successful.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
