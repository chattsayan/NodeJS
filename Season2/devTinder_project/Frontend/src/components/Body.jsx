import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <Navbar />
      {/* CHILDREN ROUTES inside Outlet - routing in app.jsx */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

/*
body
    Navbar
    Route=/ => feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile
 
 */
