import BookingCalendar from "~/pages/booking";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
const Products = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    return (
      <Layout>
        <BookingCalendar />
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Products;
