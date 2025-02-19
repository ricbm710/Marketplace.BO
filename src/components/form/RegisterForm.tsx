import { useState } from "react";
//types
import { RegisterFormDataType } from "../../types/registerForm.types";
//utils
import { register } from "../../utils/register";
import { login } from "../../utils/login";
import { fetchUserDetails } from "../../utils/fetchUserDetails";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormDataType>({
    email: "",
    name: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //navigation
  const navigate = useNavigate();
  //user context
  const { loginContext, setExpired } = useUser();

  //submit state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await register(formData);
      //login logic
      const token = await login({
        email: formData.email,
        password: formData.password,
      });
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

        navigate("/");
      } else {
        throw new Error("Invalid Token Received!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-2 m-2">
      <form className="p-2 flex flex-col items-center" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-center custom-txt-lg md:mb-2">
          Registro de Usuario
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
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="p-1 block w-full border border-gray-500 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col custom-txt-sm">
          <label htmlFor="phone">Telefono</label>
          <input
            type="text"
            name="phone"
            id="phone"
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
          disabled={isSubmitting}
          className={`mt-3 p-2 custom-txt-sm text-white border border-gray-500 bg-amber-700 rounded hover:bg-amber-600`}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
