import { createClient } from "urql";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const client = createClient({
  url: "https://api.dev.anyaa.io/graphql",
  fetchOptions: () => {
    const token = cookies.get("accessToken");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export default client;
