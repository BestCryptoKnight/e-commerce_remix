import DashboardPage from "~/pages/Dashboard";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
const Dashboard = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    return (
      <Layout>
        <DashboardPage />
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Dashboard;
