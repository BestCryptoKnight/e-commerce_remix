import CategoriesList from "~/pages/categories/categories-list";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
const Categories = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    return (
      <Layout>
        <CategoriesList />
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Categories;
