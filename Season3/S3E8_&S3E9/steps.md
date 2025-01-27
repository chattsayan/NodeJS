frontend part

- create Chat.jsx component
- add route to App.jsx
- add chat button in Connection.jsx which on click will route to /chat/:targetUserId
- setup socket connection in socket.js
- handle real-time functionality for a chat system in Chat.jsx inside useEffect()

  backend part

- install socket.io module: npm i socket.io
- import http module in App.jsx
- initialize the socket on socket.js
- create room for different people
