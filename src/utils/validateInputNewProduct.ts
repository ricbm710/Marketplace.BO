export const validateInputNewProduct = (
  name: string | null | undefined,
  value: string | null | undefined
): string => {
  if (!name) return "El campo de entrada no es válido.";
  if (value == null || value.trim() === "")
    return "El valor no puede ser nulo o vacío.";

  switch (name) {
    case "name":
      if (value.length < 5)
        return "El nombre del producto no puede tener menos de 5 caracteres.";
      break;
    case "price":
      if (isNaN(Number(value))) return "El precio debe ser un número válido.";
      if (Number(value) <= 0)
        return "El precio debe ser un número mayor que 0.";
      break;
    case "condition":
      break; // You can add custom validation if needed.
    case "description":
      if (value.length > 255)
        return "La descripción del producto no puede tener mas de 255 caracteres.";
      break;
    case "city":
      break; // You can add custom validation if needed.
    default:
      return "El tipo de campo no es válido.";
  }

  return ""; // Return an empty string if there's no validation error.
};
