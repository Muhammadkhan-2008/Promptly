import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Promptly – Free AI Prompt Generator</title>
        <meta
          name="description"
          content="Turn any video or image into a perfect AI prompt. Free, fast, no sign-up needed."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: 'Plus Jakarta Sans', sans-serif; background: #F8F6FF; }`}</style>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
