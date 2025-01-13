//rrd
import { Link } from "react-router-dom";
//context
import { useUser } from "../../context/userContext";

const Navbar = () => {
  //context
  const { user } = useUser();
  console.log(user);

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-amber-700 p-2 md:p-4">
          <div>
            <Link to="/">
              <h1 className="text-white text-lg md:text-2xl">Marketplace.BO</h1>
            </Link>
          </div>
        </div>
        <p className="p-2">Usuario: {user?.name || ""}</p>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Navbar;
