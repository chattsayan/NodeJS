import io from "socket.io-client";
import { BASE_URL } from "./constants";

// setting up the socket connection
export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    // telling the client to connect to the backend server
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
