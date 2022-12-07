import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "Redux/store";
import { GlobalSylesWrapper } from "Styles/global";
import "antd/dist/antd.less";
import App from "Pages/App";
import { ApolloProvider } from "@apollo/client";
import GraphQLClient from "./GraphQL";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalSylesWrapper>
        <ApolloProvider client={GraphQLClient}>
          <App />
        </ApolloProvider>
      </GlobalSylesWrapper>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
