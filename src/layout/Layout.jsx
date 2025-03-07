import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useProductCompare } from "../context/ProductCompareContext";
import { AppstoreOutlined, SwapOutlined, CloseOutlined, MenuOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { compareProducts } = useProductCompare();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <ShoppingOutlined className="logo-icon" />
          <span>ProductHub</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-links">
            <Link
              to="/products"
              className={`nav-link ${
                location.pathname === "/products" ? "active" : ""
              }`}
            >
              <AppstoreOutlined style={{ fontSize: '20px' }} />
              <span>Product Details</span>
            </Link>

            <Link
              to="/compare"
              className={`nav-link ${
                location.pathname === "/compare" ? "active" : ""
              }`}
            >
              <SwapOutlined style={{ fontSize: '20px' }} />
              <span>Compare Products</span>
              {compareProducts.length > 0 && (
                <span className="badge">{compareProducts.length}</span>
              )}
            </Link>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? (
              <CloseOutlined style={{ fontSize: '24px' }} />
            ) : (
              <MenuOutlined style={{ fontSize: '24px' }} />
            )}
          </button>

          <div className="header-actions">
            <div className="user-avatar">
              <UserOutlined style={{ fontSize: '20px' }} />
            </div>
          </div>
        </header>

        <div className="content-wrapper">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
