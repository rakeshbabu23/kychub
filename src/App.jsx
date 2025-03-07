import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import ProductDetails from "./pages/ProductDetails";
import CompareProducts from "./pages/ProductsCompare";
import { ProductCompareProvider } from "./context/ProductCompareContext";

const App = () => {
  return (
    <Router>
      <ProductCompareProvider>
        <Layout>
          <Routes>
            <Route path="/products" element={<ProductDetails />} />
            <Route path="/compare" element={<CompareProducts />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Layout>
      </ProductCompareProvider>
    </Router>
  );
};

export default App;
