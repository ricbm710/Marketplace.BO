import { useEffect, useState } from "react";
//rrd
import { useNavigate, useParams } from "react-router-dom";
//utils
import { fetchProductById } from "../utils/fetchProductById";
import { newProductDataType } from "../types/newProductForm.types";
import { newProductValidation } from "../types/newProductValidation";
import { mapProductToNewProduct } from "../utils/mapProductToNewProduct";
import { fetchImageFile } from "../utils/fetchImageFile";
import { validateInputNewProduct } from "../utils/validateInputNewProduct";
import { areObjectsEqual } from "../utils/areObjectsEqual";
import { updateProduct } from "../utils/updateProduct";
//types
import { Product } from "../types/product.types";
//components
import ImageUpload from "../components/UI/ImageUpload";

const MyProductEdit = () => {
  // get id parameter
  const { id } = useParams<string>();
  // get product to edit
  const [product, setProduct] = useState<Product | null>(null);
  // render states
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // navigation
  const navigate = useNavigate();
  // current product data
  const [formData, setFormData] = useState<newProductDataType>({
    name: "",
    price: 0,
    condition: "",
    description: "",
    city: "",
    imageFile: null,
  });
  // edited product data
  const [editedFormData, seteditedFormData] = useState<newProductDataType>({
    name: "",
    price: 0,
    condition: "",
    description: "",
    city: "",
    imageFile: null,
  });
  // errors as user edits
  const [formDataErrors, setFormDataErrors] = useState<newProductValidation>({
    name: "",
    price: "",
    condition: "",
    description: "",
    city: "",
    imageFile: "",
  });

  //submit state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    // get product data on component mount
    const fetchData = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log("Couldn't get the product");
      }
    };

    fetchData();
  }, [id]);

  //fills formData & editedFormData (copy) with Product data
  //image gets different treatment since it has to fetch the file from directory
  useEffect(() => {
    if (product) {
      setFormData(mapProductToNewProduct(product));
      seteditedFormData(mapProductToNewProduct(product)); //copy

      const fetchImage = async () => {
        const fetchedImageFile = await fetchImageFile(product.image_name);
        setFormData((prevData) => ({
          ...prevData,
          imageFile: fetchedImageFile,
        }));
        seteditedFormData((prevData) => ({
          ...prevData,
          imageFile: fetchedImageFile,
        })); //copy
      };
      fetchImage();
    }
  }, [product]);

  //* form handling
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    seteditedFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //flag
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Update the editedData since the Image update doesn't happen immediately. It happens in a child component
    seteditedFormData((prevData) => {
      const updatedData = { ...prevData };
      return updatedData;
    });

    // Set flag to indicate submission should proceed after state updates
    setReadyToSubmit(true);
  };

  // Watch for state updates and submit when ready
  useEffect(() => {
    if (!readyToSubmit) return;

    // Validate fields
    const errors: newProductValidation = {
      name: "",
      price: "",
      condition: "",
      description: "",
      city: "",
      imageFile: "",
    };
    let hasError = false;

    Object.entries(editedFormData).forEach(([name, value]) => {
      if (name === "imageFile") {
        if (value === null) {
          errors[name as keyof newProductValidation] =
            "No se ha seleccionado una imagen.";
          hasError = true;
        }
      } else {
        const formattedValue =
          typeof value === "number" ? value.toString() : value;
        const dataError = validateInputNewProduct(name, formattedValue);
        if (name in errors) {
          errors[name as keyof newProductValidation] = dataError;
        }
        if (dataError) hasError = true;
      }
    });

    setFormDataErrors(errors);

    // Compare data and proceed with update
    if (areObjectsEqual(formData, editedFormData)) {
      //console.log("iguales");
      setError("No se realizaron modificaciones.");
    } else {
      //console.log("desiguales");
      if (!hasError) {
        try {
          updateProduct(editedFormData, id!).then(() => {
            navigate(`/product/${id}`);
          });
        } catch (error) {
          console.log(error);
          setError("No se pudo editar el producto.");
        } finally {
          setIsSubmitting(false);
        }
      }
    }

    // Reset flag to prevent duplicate submissions
    setReadyToSubmit(false);
  }, [editedFormData, readyToSubmit]); // This runs after `editedFormData` updates

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-2 m-2 ">
        <form
          className="flex flex-col items-center md:flex-row justify-center md:gap-[200px]"
          onSubmit={handleSubmit}
        >
          <ImageUpload
            setFormData={seteditedFormData}
            imageError={formDataErrors.imageFile}
            imageName={product?.image_name}
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
                value={editedFormData.name}
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
                value={editedFormData.price}
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
                value={editedFormData.condition}
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
                value={editedFormData.description}
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
                value={editedFormData.city}
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
                Confirmar Cambios
              </button>
              {error && (
                <p
                  className={`mt-2 text-red-700 custom-txt-xs disabled:${isSubmitting}`}
                >
                  {error}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyProductEdit;
