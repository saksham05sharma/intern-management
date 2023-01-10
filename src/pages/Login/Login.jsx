import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../context/GlobalContext";
import { staff } from "../../images";
import "./login.scss";

const Login = () => {
    const navigate = useNavigate();
    const {
        getQuery,
        isAuthenticated,
        setIsAuthenticated,
        updateUser,
        axiosInstance,
        setIsLoading,
        synchronize,
        setToken,
    } = useContext(GlobalContext);

    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });
    const [role, setRole] = useState("");

    useEffect(() => {
        const role = getQuery("role");
        setRole(role);
    }, [role]);

    const handleChange = (e) => {
        setLoginUser({
            ...loginUser,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            setIsLoading(true);
            const res = await axiosInstance.post("/auth/login", {
                ...loginUser,
            });
            if (res.status === 200) {
                setToken(() => res.data.token);
                setIsAuthenticated(true);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("isAuthenticated", true);
                synchronize();
                console.info(res.data.user);
                updateUser({ ...res.data.user });
                setIsLoading(false);
            }
        } catch (error) {
            alert(error.response.data.message);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (isAuthenticated) navigate(-1);
    }, [isAuthenticated, navigate]);
    return (
        <main className="login" style={{
            backgroundImage: `url(${staff})`
        }}>
            <section className="login-container">
                <h1>Login {role === "admin" ? "as Admin" : role === "intern" ? "as Intern" : ""}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">
                            <MaterialIcons>email</MaterialIcons>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={loginUser.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            <MaterialIcons>lock</MaterialIcons>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={loginUser.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <Button text="Register" variant="outline" link="/register" type="reset" />
                        <Button type="submit" text="Login" />
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Login;