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

  const setParams = (
    updates: Record<string, string>
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    router.push(
      `${pathname}?${params.toString()}`
    );
  };

  return {
    searchParams,
    setParam,
    setParams,
  };
}