import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt={`${firstName} ${lastName}`} />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p>{`${age} years, ${gender}`}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center mt-5">
            <button
              className="btn btn-success"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
            <button
              className="btn btn-error"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
