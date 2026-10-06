"use client";

import { handleGlobalError } from "@/utils/error.handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";


export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, 
            refetchOnWindowFocus: false,
            retry: 1,
        
            onError: (error) => {
              console.error("Global Query Error:", handleGlobalError(error));
            },
          },
          mutations: {
            onError: (error) => {
              console.error("Global Mutation Error:", handleGlobalError(error));
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}