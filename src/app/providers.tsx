"use client";

import { ThemeProvider } from "next-themes";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import en_US from "../locales/en-US"; 

// Create a cache to improve performance
const cache = createIntlCache();

// Create an `intl` instance
const intl = createIntl(
  {
    locale: "en",
    messages: en_US,
  },
  cache
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RawIntlProvider value={intl}>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </RawIntlProvider>
  );
}
