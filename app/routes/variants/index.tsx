import VariantList from "~/pages/variants/variant-list";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
const Products = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    return (
      <Layout>
        <VariantList />
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Products;
