import { createClient } from "urql";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const client = createClient({
  url: "http://localhost:3001/graphql",
  fetchOptions: () => {
    const token = cookies.get("accessToken");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export default client;
