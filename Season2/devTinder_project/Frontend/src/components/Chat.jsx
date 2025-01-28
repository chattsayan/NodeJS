import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
// import { formatDistanceToNow } from "date-fns";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });

    console.log(chat?.data?.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return { firstName: senderId?.firstName, text };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  // ----- WebSocket Connection Setup -----
  useEffect(() => {
    if (!userId) {
      return;
    }

    // Establish the WebSocket Connection
    const socket = createSocketConnection();

    // emit the joinChat event
    // as soon as the page loads, the socket connection is established and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // receive the messageReceived event
    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(`message received from ${firstName} : ${text}`);
      setMessages((prevMessages) => [...prevMessages, { firstName, text }]);
    });

    // Cleaning Up the WebSocket Connection
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // ----- Sending Messages -----
  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName}`}
                <time className="text-xs opacity-50 ml-2">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 bg-gray-700 text-white rounded p-2"
          placeholder="Chat..."
        ></input>
        <button onClick={sendMessage} className="btn bg-green-600 text-white">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
