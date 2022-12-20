/* eslint-disable react-hooks/rules-of-hooks */
import OrderssList from "~/pages/orders/orders-list";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
const Products = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    let { t } = useTranslation();

    return (
      <Layout>
        <>
          <OrderssList />
          <h1>{t("greeting")}</h1>
        </>
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Products;
