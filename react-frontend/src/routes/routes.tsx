import AllOutIcon from "@material-ui/icons/AllOut";
import DashboardIcon from "@material-ui/icons/Dashboard";
import React from "react";
import Dashboard from "../component/Dashboard";
import { FileView } from "../component/file-manager/FileView";
import { SignIn } from "../component/SignIn";
import { SignUp } from "../component/SignUp";
import { UserList } from "../component/UserList";

export const dashboardRoutes = [
  {
    path: "/signin",
    name: "Sign In",
    icon: <DashboardIcon></DashboardIcon>,
    component: <SignIn></SignIn>,
    layout: "/signin",
  },
  {
    path: "/signin",
    name: "Sign In",
    icon: <DashboardIcon></DashboardIcon>,
    component: <SignIn></SignIn>,
    layout: "/signin",
  },
  {
    path: "/SignUp",
    name: "SignUp",
    icon: <DashboardIcon></DashboardIcon>,
    component: <SignUp></SignUp>,
    layout: "/signup",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon></DashboardIcon>,
    component: <Dashboard></Dashboard>,
    layout: "/dashboard",
  },
  {
    path: "/admin",
    name: "admin",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Dashboard></Dashboard>,
    layout: "/admin",
  },
  {
    path: "/",
    name: "Sign In",
    icon: <DashboardIcon></DashboardIcon>,
    component: <SignIn></SignIn>,
    layout: "/",
  },
];
export const secondaryRoutes = [
  {
    path: "/dashboard/view-files",
    name: "/dashboard/view-files",
    icon: <AllOutIcon></AllOutIcon>,
    component: <FileView></FileView>,
    layout: "/dashboard/view-files",
  },
  {
    path: "/dashboard/userlist",
    name: "/dashboard/userlist",
    icon: <AllOutIcon></AllOutIcon>,
    component: <UserList></UserList>,
    layout: "/dashboard/userlist",
  },
];
