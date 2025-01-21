import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return; // Avoid unnecessary API calls if feed data already exists.

    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      // console.log(res?.data);

      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    feed && (
      <div className="flex flex-wrap items-center justify-center gap-5 my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
