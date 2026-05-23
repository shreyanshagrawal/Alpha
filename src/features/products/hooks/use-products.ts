import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/features/products/services/product-service";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],

    queryFn: getProducts,

    refetchInterval: 10000,
  });
};