const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

// Generating a Secret Room ID
const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  // Configuring Socket.IO
  // server: Links the WebSocket server to the HTTP server
  const io = socket(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
    },
  });

  // accept/listening connection
  io.on("connection", (socket) => {
    // handle events
    // Listens for a joinChat event sent by the client.
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      // two users will have a same roomId
      const roomId = [userId, targetUserId].sort().join("_");

      console.log(`User ${firstName} joined chat room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          // const roomId = [userId, targetUserId].sort().join("_");
          console.log(`${firstName} : ${text}`);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();

          // server transfers the message to the client(room)
          io.to(roomId).emit("messageReceived", { firstName, text });
        } catch (error) {
          console.log(error);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
