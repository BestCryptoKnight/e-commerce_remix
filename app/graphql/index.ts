// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// const httpLink = createHttpLink({
//   uri: process.env.REACT_APP_API_URL,
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });
// export default client;

import { createClient } from "urql";

const client = createClient({
  url: "https://api.dev.anyaa.io/graphql",
  fetchOptions: () => {
    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export default client;
