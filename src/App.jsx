import React from "react";
import { Route, Routes } from "react-router-dom";

import "./Index";

// Layout Components
import Nav from "./Container/NavigationBar/Nav";
import Footer from "./Container/Footer/Footer";

// Page Components
import Home from "./Container/Section/Home";
import About from "./Container/Section/About";
import Contact from "./Container/Section/Contact";
import Service from "./Container/Section/Service";
import Blog from "./Container/Section/Blog";
import Cart from "./Container/Cart/Cart";
import ProductCard from "./Container/Section/ProductCard";
import ProfileCard from "./Container/Section/ProfileCard";
import Dashboard from "./Container/Section/Dashboard";
import PageNotFound from "./Container/PageNotFound/PageNotFound";
// Form Components
import Login from "./Form/Login";
import Signup from "./Form/Signup";
import ItemDetails from "./Container/Cards/ItemDetails";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main Application Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/blog" element={<Blog />} />

          {/* Product & Cart Routes */}
          <Route path="/products" element={<ProductCard />} />
          <Route path="/cart" element={<Cart />} />

          {/* ItemDetails */}
          <Route path="/ItemDetails" element={<ItemDetails />} />

          {/* User Profile Routes */}
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 404 Page - Always last */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
