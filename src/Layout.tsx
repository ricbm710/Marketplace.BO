//rrd
import { Outlet } from "react-router-dom";
//components
import Navbar from "./components/main/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <div>Footer</div>
    </>
  );
};

export default Layout;
