import { createClient } from "urql";
import Cookies from "universal-cookie";
import { env } from "~/env";
const cookies = new Cookies();
const client = createClient({
  url: env.API_URL,
  fetchOptions: () => {
    const token = cookies.get("accessToken");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export default client;
