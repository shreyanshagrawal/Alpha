"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export function useUrlState() {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const createQueryString = (
    name: string,
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    return params.toString();
  };

  const setParam = (
    key: string,
    value: string
  ) => {
    router.push(
      `${pathname}?${createQueryString(
        key,
        value
      )}`
    );
  };

  return {
    searchParams,
    setParam,
  };
}