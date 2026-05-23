import { useMemo, useCallback } from "react";
import { SortingState, Updater } from "@tanstack/react-table";
import { useUrlState } from "@/hooks/use-url-state";
import { useDebounce } from "@/hooks/use-debounce";
import { Product } from "@/features/products/types/product";

export function useProductFilters(data: Product[] | undefined) {
  const { searchParams, setParam } = useUrlState();

  // URL State
  const search = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const ratingParam = Number(searchParams.get("rating")) || 0;
  const sortParam = searchParams.get("sort") || "";

  const selectedCategories = useMemo(
    () => (categoryParam.length > 0 ? categoryParam.split(",") : []),
    [categoryParam]
  );

  const debouncedSearch = useDebounce(search, 300);

  const categories = useMemo<string[]>(() => {
    if (!data) return [];
    return Array.from(new Set(data.map((product) => product.category)));
  }, [data]);

  // Bidirectional sync derived from URL
  const sorting = useMemo<SortingState>(() => {
    if (!sortParam) return [];
    const parts = sortParam.split("-");
    return [
      {
        id: parts[0],
        desc: parts[1] === "desc",
      },
    ];
  }, [sortParam]);

  const handleSortingChange = useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      const newSorting =
        typeof updaterOrValue === "function" ? updaterOrValue(sorting) : updaterOrValue;
      if (newSorting.length > 0) {
        const sort = newSorting[0];
        setParam("sort", `${sort.id}-${sort.desc ? "desc" : "asc"}`);
      } else {
        setParam("sort", "");
      }
    },
    [setParam, sorting]
  );

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!data) return [];

    return data.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const matchesRating = !ratingParam || product.rating >= ratingParam;

      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [data, debouncedSearch, selectedCategories, ratingParam]);

  // Expose precise handlers wrapped in useCallback
  const handleSearchChange = useCallback(
    (value: string) => setParam("search", value),
    [setParam]
  );

  const handleCategoryChange = useCallback(
    (cats: string[]) => setParam("category", cats.join(",")),
    [setParam]
  );

  const handleRatingChange = useCallback(
    (rating: number) => setParam("rating", rating > 0 ? String(rating) : ""),
    [setParam]
  );

  return {
    search,
    selectedCategories,
    ratingParam,
    categories,
    sorting,
    filteredProducts,
    handleSortingChange,
    handleSearchChange,
    handleCategoryChange,
    handleRatingChange,
  };
}
