import { createContext } from "react";

const GlobalContext = createContext({
	breakpoint: () => { },
	isLoading: "",
	setIsLoading: () => { },
	isAuthenticated: "",
	setIsAuthenticated: () => { },
	axiosInstance: undefined,
	useQuery: () => { },
	query: undefined,
	getQuery: () => { },
	user: undefined,
	updateUser: () => { },
	token: undefined,
	setToken: () => { },
	synchronize: () => { },
	verifyUser: () => { },
});

export default GlobalContext;
