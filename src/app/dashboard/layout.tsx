"use client";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//import RenderRouter from "./routes";
import { ConfigProvider, theme as antdTheme } from "antd";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalState } from "./stores/global.store";
import dayjs from "dayjs";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import store from "./stores";
import { Inter } from "next/font/google";
import "../../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/dashboard">
        <DashboardProvider>{children}</DashboardProvider>
      </BrowserRouter>
    </Provider>
  );
}

function DashboardProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const locale = useSelector((state: any) => state.user.locale);
  const theme = useSelector((state: any) => state.global.theme);

  // Update theme based on Redux state
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("theme")) {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        function matchMode(e: MediaQueryListEvent) {
          dispatch(
            setGlobalState({
              theme: e.matches ? "dark" : "light",
            })
          );
        }
        mql.addEventListener("change", matchMode);
      }
    }
  }, [dispatch]);

  // Update day.js locale when Redux state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      dayjs.locale(locale === "en_US" ? "en" : "zh-cn");
    }
  }, [locale]);

  const getAntdLocale = () => (locale === "en_US" ? enUS : zhCN);

  return (
    <ConfigProvider
      locale={getAntdLocale()}
      componentSize="middle"
      theme={{
        token: { colorPrimary: "#13c2c2" },
        algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <Suspense fallback={null}>
        <div className={`dashboard-container flex ${inter.className}`}>
          {children}
        </div>
      </Suspense>
    </ConfigProvider>
  );
}

// <RenderRouter />
