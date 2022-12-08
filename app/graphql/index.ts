import { createClient } from "urql";

const client = createClient({
  url: process.env.API_UR
    ? process.env.API_UR
    : "https://api.dev.anyaa.io/graphql",
  fetchOptions: () => {
    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export default client;
