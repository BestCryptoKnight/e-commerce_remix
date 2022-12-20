import { useTranslation } from "react-i18next";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = async ({ request }: any) => {
  return json({
    lngs: {
      en: { nativeName: "English" },
      ar: { nativeName: "Arabic" },
    },
  });
};

export default function Component() {
  const { lngs } = useLoaderData();
  const { t, ready, i18n } = useTranslation("index");

  return (
    <div>
      {Object.keys(lngs).map((lng) => (
        <Link
          key={lng}
          style={{
            marginRight: 5,
            fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
          }}
          to={`/?lng=${lng}`}
        >
          {lngs[lng].nativeName}
        </Link>
      ))}
    </div>
  );
}
