import React from "react";
import { Routes as Router, Route, Link, useLoaderData } from "react-router-dom";
import { Dashboard, ErrorPage, PageNotFound, ProductPage, CategoryPage, ShopPage, LoginPage } from "@pages";
import OrderPage from "../pages/order";



const AllRoutes = () => {
    return (
        <Router>
            <Route path="/" exact element={<Dashboard />} errorElement={<ErrorPage />} />
            <Route path="dashboard" exact element={<Dashboard />} errorElement={<ErrorPage />} />
            <Route path="login" exact element={<LoginPage />} errorElement={<ErrorPage />} />
            <Route path="products" exact element={<ProductPage />} errorElement={<ErrorPage />} />
            <Route path="categories" exact element={<CategoryPage />} errorElement={<ErrorPage />} />
            <Route path="shops" exact element={<ShopPage />} errorElement={<ErrorPage />} />
            <Route path="orders" exact element={<OrderPage />} errorElement={<ErrorPage />} />
            <Route path="*" element={<PageNotFound />}  />
        </Router>
    );
};


async function BlogDetailLoader(params) {
    console.log({params});
    return true;
}

export default AllRoutes;