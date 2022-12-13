import TagsList from "~/pages/tags/tags-list";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
const Products = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    return (
      <Layout>
        <TagsList />
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Products;
