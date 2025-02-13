import React, { useState } from "react";
//components
import ImageUpload from "../UI/ImageUpload";
//types
import { newProductDataType } from "../../types/newProductForm.types";
import { newProductValidation } from "../../types/newProductValidation";
//axios
import axios from "axios";
//config
import { API_URL } from "../../config";
//utils
import { getTokenString } from "../../utils/getTokenString";
import { validateInputNewProduct } from "../../utils/validateInputNewProduct";
//rrd
import { useNavigate } from "react-router-dom";

const NewProductForm = () => {
  const [formData, setFormData] = useState<newProductDataType>({
    name: "",
    price: 0,
    condition: "",
    description: "",
    city: "",
    imageFile: null,
  });
  const [formDataErrors, setFormDataErrors] = useState<newProductValidation>({
    name: "",
    price: "",
    condition: "",
    description: "",
    city: "",
    imageFile: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validate fields
    const errors: newProductValidation = {
      name: "",
      price: "",
      condition: "",
      description: "",
      city: "",
      imageFile: "",
    };
    let hasError = false;

    Object.entries(formData).forEach(([name, value]) => {
      //treat imageFile
      if (name === "imageFile") {
        if (value === null) {
          errors[name as keyof newProductValidation] =
            "No se ha seleccionado una imagen.";
          hasError = true; // Set hasError to true if there's an error
        }
      } else {
        const formattedValue =
          typeof value === "number" ? value.toString() : value;
        const dataError = validateInputNewProduct(name, formattedValue);
        if (name in errors) {
          errors[name as keyof newProductValidation] = dataError; // Assign the error
        }

        if (dataError) hasError = true;
      }
    });
    setFormDataErrors(errors);

    //grab token
    const tokenString = getTokenString();
    if (!tokenString) {
      return null;
    }
    if (!hasError) {
      try {
        const { name, price, condition, description, city, imageFile } =
          formData;

        const response = await axios.post(
          `${API_URL}/products`,
          {
            name,
            price,
            condition,
            description,
            city,
            imageFile,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenString}`,
              "Content-Type": "multipart/form-data", // Specify the content type
            },
          }
        );
        const newProductId = response.data.productId;
        navigate(`/product/${newProductId}`);
      } catch (error) {
        setError("No se pudo crear el producto.");
      }
    }
  };

  return (
    <div className="p-2 m-2 ">
      <form
        className="flex flex-col items-center md:flex-row justify-center md:gap-[200px]"
        onSubmit={handleSubmit}
      >
        <ImageUpload
          setFormData={setFormData}
          imageError={formDataErrors.imageFile}
        ></ImageUpload>
        <div className="border border-gray-700 p-2 mt-2 rounded-md bg-gray-100 w-full max-w-[400px] flex flex-col">
          <div className="flex flex-col custom-txt-sm">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-1 block w-full border border-gray-500 rounded"
              onChange={handleChange}
            />
            {formDataErrors.name && (
              <p className="custom-txt-xs text-red-700">
                {formDataErrors.name}
              </p>
            )}
          </div>
          <div className="flex flex-col custom-txt-sm">
            <label htmlFor="price">Precio (Bs):</label>
            <input
              type="number"
              name="price"
              id="price"
              className="p-1 block w-full border border-gray-500 rounded"
              min="0"
              onChange={handleChange}
            />
            {formDataErrors.price && (
              <p className="custom-txt-xs text-red-700">
                {formDataErrors.price}
              </p>
            )}
          </div>
          <div className="flex flex-col custom-txt-sm">
            <label htmlFor="condition">Estado:</label>
            <select
              name="condition"
              id="condition"
              className="p-1 block w-full border border-gray-500 rounded"
              onChange={handleChange}
              value={formData.condition}
            >
              <option value="" disabled>
                -- Escoge un Estado --
              </option>
              <option value="Nuevo">Nuevo</option>
              <option value="Como Nuevo">Como Nuevo</option>
              <option value="Muy Bueno">Muy Bueno</option>
              <option value="Bueno">Bueno</option>
              <option value="Aceptable">Aceptable</option>
              <option value="No Funciona">No Funciona</option>
            </select>
            {formDataErrors.condition && (
              <p className="custom-txt-xs text-red-700">
                {formDataErrors.condition}
              </p>
            )}
          </div>
          <div className="flex flex-col custom-txt-sm">
            <label htmlFor="description">Descripcion:</label>
            <textarea
              name="description"
              id="description"
              rows={5}
              className="p-1 block w-full border border-gray-500 rounded"
              onChange={handleChange}
            />
            {formDataErrors.description && (
              <p className="custom-txt-xs text-red-700">
                {formDataErrors.description}
              </p>
            )}
          </div>
          <div className="flex flex-col custom-txt-sm">
            <label htmlFor="city">Ciudad:</label>
            <select
              name="city"
              id="city"
              className="p-1 block w-full border border-gray-500 rounded"
              onChange={handleChange}
              value={formData.city}
            >
              <option value="" disabled>
                -- Escoge una Ciudad --
              </option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="La Paz">La Paz</option>
              <option value="Cochabamba">Cochabamba</option>
              <option value="Pando">Pando</option>
              <option value="Beni">Beni</option>
              <option value="Oruro">Oruro</option>
              <option value="Potosi">Potosi</option>
              <option value="Chuquisaca">Chuquisaca</option>
              <option value="Tarija">Tarija</option>
            </select>
            {formDataErrors.city && (
              <p className="custom-txt-xs text-red-700">
                {formDataErrors.city}
              </p>
            )}
          </div>
          <div className="flex justify-center flex-col items-center">
            <button
              type="submit"
              className="mt-3 p-2 custom-txt-sm text-white border border-gray-500 bg-amber-700 rounded hover:bg-amber-600 max-w-[200px]"
            >
              Publicar
            </button>
            {error && (
              <p className="mt-2 text-red-700 custom-txt-xs">{error}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;
