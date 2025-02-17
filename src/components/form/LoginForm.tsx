//hooks
import { useState } from "react";
//types
import { LoginFormDataType } from "../../types/loginForm.types";
//utils
import { login } from "../../utils/login";
import { fetchUserDetails } from "../../utils/fetchUserDetails";
//rrd
import { Link, useNavigate } from "react-router-dom";
//context
import { useUser } from "../../context/userContext";

const LoginForm = () => {
  //form data state
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "",
    password: "",
  });
  //login error state
  const [error, setError] = useState<String | null>(null);

  //navigation
  const navigate = useNavigate();
  //user context
  const { loginContext, setExpired } = useUser();

  //submit state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  //handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  //on submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    //login logic
    try {
      //login returns the jwt string
      const token = await login(formData);
      if (token) {
        localStorage.setItem("authToken", JSON.stringify(token));

        //set user context
        const userDetails = await fetchUserDetails(
          setExpired as React.Dispatch<React.SetStateAction<boolean>>
        );
        if (userDetails) {
          loginContext(userDetails);
        } else {
          throw new Error("Couldn't get the data from the user");
        }

        navigate(-1);
      } else {
        throw new Error("Invalid Token Received!");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-2 m-2">
      <form className="p-2 flex flex-col items-center" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-center custom-txt-lg md:mb-2">
          Inicio de Sesion
        </h2>
        <div className="flex flex-col custom-txt-sm">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="p-1 block w-full border border-gray-500 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col custom-txt-sm">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="p-1 block w-full border border-gray-500 rounded"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="mt-3 p-2 custom-txt-sm text-white border border-gray-500 bg-amber-700 rounded hover:bg-amber-600"
        >
          Iniciar Sesion
        </button>
        {error && (
          <p className={`mt-2 text-red-700 text-sm disabled:${isSubmitting}`}>
            No se pudo iniciar sesión.
          </p>
        )}
      </form>
      <p className="text-center custom-txt-xs">
        No tenés una cuenta? Registrate{" "}
        <Link to="/register" className="text-blue-500 underline">
          aquí
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
