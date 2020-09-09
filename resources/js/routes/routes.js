/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "@pages/Admin/Dashboard/Dashboard.jsx";
import CreateProduct from "@pages/Admin/Product/CreateProduct.jsx";
import CreateCategory from "@pages/Admin/Category/CreateCategory.jsx";

var routes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    collapse: true,
    path: "/product",
    name: "Products",
    state: "openComponents",
    icon: "pe-7s-photo-gallery",
    views: [
      {
        path: "/create",
        layout: "/admin",
        name: "Create",
        mini: "C",
        component: CreateProduct
      }
    ]
  },
  {
    collapse: true,
    path: "/category",
    name: "Category",
    state: "openCategory",
    icon: "pe-7s-plugin",
    views: [
      {
        path: "/create-category",
        layout: "/admin",
        name: "Create Category",
        mini: "CC",
        component: CreateCategory
      }
    ]
  }
];
export default routes;
