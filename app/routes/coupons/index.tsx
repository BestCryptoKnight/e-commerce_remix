import CouponsList from "~/pages/coupons/coupons-list";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
const Products = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    return (
      <Layout>
        <CouponsList />
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Products;
