import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/server-runtime";
import { ServerStyleSheet } from "styled-components";
import { createInstance } from "i18next";
import Backend from "i18next-fs-backend";
import { resolve } from "node:path";
import { renderToString } from "react-dom/server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "./i18next.server";
import i18n from "./i18n";

export default async function handleRequest(
  request: Request,
  statusCode: number,
  headers: Headers,
  context: EntryContext
) {
  let instance = createInstance();
  const sheet = new ServerStyleSheet();

  let lng = await i18next.getLocale(request);
  let ns = i18next.getRouteNamespaces(context);

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: {
        loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
      },
    });

  let markup = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer context={context} url={request.url} />
    </I18nextProvider>
  );
  const styles = sheet.getStyleTags();
  markup = markup.replace("__STYLES__", styles);
  headers.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: statusCode,
    headers: headers,
  });
}
