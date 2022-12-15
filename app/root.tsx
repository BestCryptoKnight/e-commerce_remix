import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Provider } from "urql";
import GraphQLClient from "./graphql";
import tailwindStylesheetUrl from "~/styles/tailwind.css";
import antStylesUrl from "~/styles/antd-customized.css";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import calendarStyles from "fullcalendar/main.min.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: antStylesUrl },
    { rel: "stylesheet", href: calendarStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Anyaa portal",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    if (!cookies.get("accessToken")) {
      navigate("/login");
    }
  }, []);

  return (
    <html lang="en" className="h-full">
      <head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCpDNOfbiKVenZZrQ8N-dzwzOKxWuRh0c&libraries=places"></script>
        <script
          src={`https://cdn.tiny.cloud/1/x6dm7f5o70w2uodxebi2vqi7f447kwx3b3fcm29tdleitqub/tinymce/6/tinymce.min.js`}
        ></script>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body className="h-full">
        <ReduxProvider store={store}>
          <Provider value={GraphQLClient}>
            <Outlet />
          </Provider>
        </ReduxProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
