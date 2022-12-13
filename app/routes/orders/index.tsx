import OrdersList from "~/pages/orders/orders-list";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
const Orders = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    return (
      <Layout>
        <OrdersList />
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Orders;
