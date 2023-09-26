/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import AddProduct from 'views/AddProduct.js'
import Blog from "views/Blog";
import UsersCRUD from "views/UsersCRUD";
import Orders from "views/Orders";
import Login from 'views/Login'
import HomeSlider from "views/HomeSlider";
import SpecialOffers from "views/SpecialOffers";
import Banners from "views/Banners";
import TopSelling from "views/TopSelling";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
   {
    path: "/homeslider",
    name: "Home Slider",
    icon: "nc-icon nc-diamond",
    component: <HomeSlider />,
    layout: "/admin",
  },
   {
    path: "/specialoffer",
    name: "Special Offers",
    icon: "nc-icon nc-diamond",
    component: <SpecialOffers />,
    layout: "/admin",
  },
   {
    path: "/banners",
    name: "Banners",
    icon: "nc-icon nc-diamond",
    component: <Banners />,
    layout: "/admin",
  },
   {
    path: "/topselling",
    name: "Top Selling ",
    icon: "nc-icon nc-diamond",
    component: <TopSelling />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  {
    path: "/usercrud",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: <UsersCRUD />,
    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "nc-icon nc-single-02",
  //   component: <Login/>,
  //   layout: "/admin",
  // },
  {
    path: "/events",
    name: "Events",
    icon: "nc-icon nc-single-02",
    component: <AddProduct/>,
    layout: "/admin",
  },
  {
    path: "/blog",
    name: "Blog",
    icon: "nc-icon nc-single-02",
    component: <Blog/>,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "nc-icon nc-single-02",
    component: <Orders/>,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;
