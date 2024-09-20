"use client"

import "@repo/ui/styles/globals.css";
import "../styles/mdx.css";
import type { AppProps } from "next/app";
import ReduxProvider from "@repo/data-context/provider";
import { PersistGate, persistor } from "@repo/data-context/store";
// theme
import { ThemeProvider } from "@repo/ui/theme-provider";
// layout
import MainLayout from "@/sections/layouts/main";
// components
import ProgressBar from "@/components/progress-bar";
import {useRegisterSW} from "@/hooks/useRegisterSW.ts";

// ----------------------------------------------------------------------

export default function App({ Component, pageProps }: AppProps) {
  useRegisterSW()
  return (
    <ReduxProvider>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ProgressBar />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </PersistGate>
      </ThemeProvider>
    </ReduxProvider>
  );
}
