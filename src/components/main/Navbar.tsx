import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-amber-700 p-2 md:p-4">
        <div>
          <Link to="/">
            <h1 className="text-white text-lg md:text-2xl">Marketplace.BO</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
