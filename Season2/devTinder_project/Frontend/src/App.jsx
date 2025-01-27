import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Connections from "./components/Connections";
import Profile from "./components/Profile";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      {/* PROVIDING REDUX STORE */}
      <Provider store={appStore}>
        {/* ROUTING */}
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
