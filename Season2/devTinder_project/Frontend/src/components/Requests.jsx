import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      // console.log(res?.data?.data);

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests found!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center w-[70%] m-4 p-4 rounded-lg bg-base-300 mx-auto gap-5"
          >
            <div>
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full object-cover mx-4"
              />
            </div>

            <div className="flex flex-col justify-start items-start mx-6">
              <div className="text-left">
                <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
              </div>

              {age && gender && <p>{`${gender}, ${age} years`}</p>}

              <p className="text-left">{about}</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                className="btn btn-outline btn-accent"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-outline btn-secondary"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
