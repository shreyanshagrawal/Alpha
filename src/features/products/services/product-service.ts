import { api } from "@/lib/axios";

export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data.products;
};

export const getProductById = async (
  id: string
) => {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data;
};