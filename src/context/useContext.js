import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { omit } from "../utils";

export const useContextData = () => {

	const location = useLocation();
	// Loading State
	const [isLoading, setIsLoading] = useState(false);

	// Global Authentication State
	const isLocalAuthenticated = localStorage.getItem("isAuthenticated");
	const [isAuthenticated, setIsAuthenticated] = useState(
		JSON.parse(isLocalAuthenticated) || false
	);

	// Global User State
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const [token, setToken] = useState(localStorage.getItem("token") || null);
	const updateUser = (newUser) => {
		localStorage.removeItem("user");
		setUser(null);
		localStorage.setItem(
			"user",
			JSON.stringify(omit({ ...user, ...newUser }, "password"))
		);
		setUser((p) => ({ ...p, ...newUser }));
	};

	// Axios Instance Configurations
	const axiosInstance = axios.create({
		// eslint-disable-next-line no-undef
		baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	});

	// Hook for using query params
	const useQuery = () => new URLSearchParams(location.search);
	const query = useQuery();
	const getQuery = (key) => query.get(key);

	const formatURL = (url) => {
		// check for any query params and append them in the url
		
		if (query.get("redirect")) {
			return `${url}?redirect=${query.get("redirect")}`;
		} else {
			return url;
		}
	};

	// Synchronize
	const synchronize = async () => { };

	// Media Breakpoints
	const mediaQuerySm = window.matchMedia("(max-width: 672px)");
	const mediaQueryMd = window.matchMedia("(max-width: 880px)");
	const mediaQueryLg = window.matchMedia("(min-width: 880px)");
	const breakpoint = (device) => {
		if (device === "mobile") return mediaQuerySm.matches;
		else if (device === "tab") return mediaQueryMd.matches;
		else return mediaQueryLg.matches;
	};
	mediaQuerySm.addListener(breakpoint);
	mediaQueryMd.addListener(breakpoint);
	mediaQueryLg.addListener(breakpoint);

	return {
		breakpoint,
		isLoading,
		setIsLoading,
		isAuthenticated,
		setIsAuthenticated,
		axiosInstance,
		useQuery,
		query,
		getQuery,
		user,
		updateUser,
		token,
		setToken,
		synchronize,
	};
};
