import SettingsPage from "~/pages/settings";
import Layout from "~/components/layout/main";
import Cookies from "universal-cookie";
const Settings = () => {
  const cookies = new Cookies();
  if (cookies.get("accessToken")) {
    return (
      <Layout>
        <SettingsPage />
      </Layout>
    );
  } else {
    return <></>;
  }
};

export default Settings;
