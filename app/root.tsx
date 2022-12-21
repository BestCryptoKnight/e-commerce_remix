import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { useEffect } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
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
import { i18nCookie } from "./i18-cookie";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { env } from "./env";
export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: antStylesUrl },
    { rel: "stylesheet", href: calendarStyles },
  ];
};

export let loader: LoaderFunction = async ({ request }) => {
  let locale = await i18next.getLocale(request);

  return json(
    { locale, ENV: env },
    {
      headers: { "Set-Cookie": await i18nCookie.serialize(locale) },
    }
  );
};

export let handle = {
  i18n: "common",
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Anyaa portal",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const navigate = useNavigate();

  let { locale, ENV } = useLoaderData<typeof loader>();

  let { i18n } = useTranslation();

  useEffect(() => {
    const cookies = new Cookies();
    if (!cookies.get("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()} className="h-full">
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
