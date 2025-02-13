import React, { useEffect, useState } from "react";
//types
import { newProductDataType } from "../../types/newProductForm.types";
//config
import { IMAGE_STORAGE, IMAGE_URL } from "../../config";

interface ImageUploadProps {
  setFormData: React.Dispatch<React.SetStateAction<newProductDataType>>;
  imageError: string;
  imageName?: string;
}

const ImageUpload = ({
  setFormData,
  imageError,
  imageName,
}: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageName) {
      setPreviewUrl(
        IMAGE_STORAGE === "local"
          ? `${IMAGE_URL}/products/${imageName}`
          : imageName
      );
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      //set Form Data
      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
      }));

      // Generate a preview URL for the image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    //set Form Data as null
    setFormData((prevData) => ({
      ...prevData,
      imageFile: null,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <label
        htmlFor="imageUpload"
        className="max-w-[200px] md:max-w-[400px] w-full aspect-square p-1 md:p-3 mx-auto border-2 border-dashed border-gray-400 rounded-md bg-gray-50 cursor-pointer flex items-center justify-center hover:bg-gray-100"
      >
        {previewUrl ? (
          <img
            src={previewUrl!}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="custom-txt-xs md:custom-txt-sm">
            Click para subir una imagen.
          </span>
        )}
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <button
        className={`${
          selectedImage ? "bg-amber-800" : "bg-slate-700"
        } custom-txt-xs mt-2 text-white py-2 px-4 rounded-lg hover:bg-amber-950 transition duration-300`}
        onClick={handleRemove}
        disabled={!previewUrl}
      >
        Quitar Imagen
      </button>
      {imageError && <p className="custom-txt-xs text-red-700">{imageError}</p>}
    </div>
  );
};

export default ImageUpload;
