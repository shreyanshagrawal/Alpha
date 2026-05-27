import { useMemo, useCallback } from "react";
import { SortingState, Updater, PaginationState } from "@tanstack/react-table";
import { useUrlState } from "@/hooks/use-url-state";
import { useDebounce } from "@/hooks/use-debounce";
import { Product } from "@/features/products/types/product";
import { useAuth } from "@/context/auth-context";

export function useProductFilters(data: Product[] | undefined) {
  const { searchParams, setParam, setParams } = useUrlState();
  const { role } = useAuth();

  // URL State
  const search = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const ratingParam = Number(searchParams.get("rating")) || 0;
  const sortParam = searchParams.get("sort") || "";
  const pageParam = Number(searchParams.get("page")) || 1;

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

  const pagination = useMemo<PaginationState>(() => ({
    pageIndex: pageParam - 1,
    pageSize: 10,
  }), [pageParam]);

  const handlePaginationChange = useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      const newPagination =
        typeof updaterOrValue === "function" ? updaterOrValue(pagination) : updaterOrValue;
      setParam("page", String(newPagination.pageIndex + 1));
    },
    [setParam, pagination]
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

      const matchesPublish = role === "admin" || product.isPublished;

      return matchesSearch && matchesCategory && matchesRating && matchesPublish;
    });
  }, [data, debouncedSearch, selectedCategories, ratingParam, role]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setParams({ search: value, page: "1" });
    },
    [setParams]
  );

  const handleCategoryChange = useCallback(
    (cats: string[]) => {
      setParams({ category: cats.join(","), page: "1" });
    },
    [setParams]
  );

  const handleRatingChange = useCallback(
    (rating: number) => {
      setParams({ rating: rating > 0 ? String(rating) : "", page: "1" });
    },
    [setParams]
  );

  return {
    search,
    selectedCategories,
    ratingParam,
    categories,
    sorting,
    pagination,
    filteredProducts,
    handleSortingChange,
    handlePaginationChange,
    handleSearchChange,
    handleCategoryChange,
    handleRatingChange,
  };
}
