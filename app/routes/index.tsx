/* eslint-disable react-hooks/rules-of-hooks */
import OrderssList from "~/pages/orders/orders-list";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";

const Products = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    return (
      <Layout>
        <>
          <OrderssList />
        </>
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Products;
