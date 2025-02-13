//rrd
import { Link } from "react-router-dom";
//context
import { useUser } from "../../context/userContext";

const Navbar = () => {
  //context
  const { user, expired } = useUser();

  //logout logic
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };
  //console.log(`user:${user}, expired:${expired}`);
  return (
    <>
      <div className="flex flex-col">
        <div className="bg-amber-700 p-2 md:p-4">
          <div className="flex flex-row items-center justify-between">
            <Link to="/">
              <h1 className="text-white text-lg md:text-2xl">Marketplace.BO</h1>
            </Link>
            {!user ? (
              <Link to="/login" className="text-white md:text-lg">
                Iniciar Sesion
              </Link>
            ) : (
              <button onClick={handleLogOut} className="text-white md:text-lg">
                Cerrar Sesion
              </button>
            )}
          </div>
        </div>
        <div className="bg-amber-800 p-1 md:p-2">
          {user && !expired && (
            <div className="flex flex-row items-center justify-between">
              <div>
                <h3 className="text-white custom-txt-xs">{user.name}</h3>
              </div>
              <div className="custom-txt-xs">
                <Link to="/new" className="text-white mx-1 border p-1">
                  Publicar Articulo
                </Link>
                <Link to="/my-products" className="text-white mx-1 border p-1">
                  Mis Articulos
                </Link>
              </div>
            </div>
          )}

          {expired && (
            <p className="text-white custom-txt-xs text-center">
              Inicio de Sesión Expirada.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
