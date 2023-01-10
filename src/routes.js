import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";

const routes = [
	{
		path: "/",
		component: <Home />,
	},
	{
		path: "/login",
		component: <Login />,
	},
	{
		path: "/register",
		component: <Register />
	},
	{
		path: "/dashboard",
		component: (
			<PrivateRoute>
				<Dashboard />
			</PrivateRoute>
		),
	},
	{
		path: "*",
		component: <NotFound />,
	},
];

export default routes;
