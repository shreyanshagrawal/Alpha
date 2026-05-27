import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { usePublishStore } from "./use-publish-store";
import { Product } from "../types/product";

import { getProducts } from "@/features/products/services/product-service";

export const useProducts = () => {
  const { publishedIds, initialize } = usePublishStore();
  
  const query = useQuery({
    queryKey: ["products"],

    queryFn: getProducts,

    refetchInterval: 10000,
  });

  useEffect(() => {
    if (query.data) {
      initialize(query.data.map((p: Product) => p.id));
    }
  }, [query.data, initialize]);

  const dataWithPublishState = useMemo(() => {
    return query.data?.map((product: Product) => ({
      ...product,
      isPublished: publishedIds[product.id] ?? false,
    }));
  }, [query.data, publishedIds]);

  return {
    ...query,
    data: dataWithPublishState,
  };
};