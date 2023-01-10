import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import Admin from "./Admin";
import "./dashboard.scss";
import User from "./User";

const Dashboard = () => {
	const { user } = useContext(GlobalContext);
	console.info(user);
	return user.role === "admin" ? <Admin /> : <User />;
};

export default Dashboard;
