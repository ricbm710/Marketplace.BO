//rrd
import { Outlet } from "react-router-dom";
//components
import Navbar from "./components/main/Navbar";
import Footer from "./components/main/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
