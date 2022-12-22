import VendorsList from "~/pages/vendors/vendors-list";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
const Orders = () => {
    const cookies = new Cookies();
    if (cookies.get("accessToken")) {
        return (
            <Layout>
                <VendorsList />
            </Layout>
        );
    } else {
        return <></>;
    }
};

export default Orders;
