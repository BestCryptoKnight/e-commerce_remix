import type { LinksFunction, MetaFunction } from "@remix-run/node";

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
  return (
    <html lang="en" className="h-full">
      <head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCpDNOfbiKVenZZrQ8N-dzwzOKxWuRh0c&libraries=places"></script>
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
