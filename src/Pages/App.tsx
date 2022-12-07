import Layout from "Components/Layout/Main/index";
import Theme from "Styles/theme";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ProductList from "Pages/Products/ProductsList";

function App() {
  const layoutWrapper = (component: JSX.Element) => (
    <PrivateRoute>
      <Layout>{component}</Layout>
    </PrivateRoute>
  );
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={layoutWrapper(<ProductList />)} />

          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const PrivateRoute = (props: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? props.children : <Navigate to="/login" />;
};

const LoginRedirect = (props: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/" /> : props.children;
};

export default App;
