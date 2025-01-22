import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      // console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return <h1>No Connections found.</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto gap-5"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
