import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { TrpcRouter } from '@ideanick/backend/src/router';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';

// eslint-disable-next-line react-refresh/only-export-components
export const trpc = createTRPCReact<TrpcRouter>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </trpc.Provider>
);
