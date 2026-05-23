"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactNode } from "react";

// create a query client, to help with caching

const queryClient = new QueryClient();

export default function QueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  //creating a client provider this will help components cache their fetches and responses, 
  // ability to use useQuery,useMutation and useInfiniteQuery
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}