import { IMAGE_URL } from "../config";

export async function fetchImageFile(imageName: string): Promise<File | null> {
  try {
    const response = await fetch(`${IMAGE_URL}/products/${imageName}`); // Adjust the path accordingly
    const blob = await response.blob();
    return new File([blob], imageName, { type: blob.type });
  } catch (error) {
    console.error("Error fetching image file:", error);
    return null;
  }
}
