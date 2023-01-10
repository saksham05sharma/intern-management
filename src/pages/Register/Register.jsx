import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../context/GlobalContext";
import { staff } from "../../images";
import "./register.scss";

const Register = () => {
    const navigate = useNavigate();
    const { axiosInstance, setIsLoading } = useContext(GlobalContext);

    const [registerUser, setRegisterUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        confirmPassword: "",
    }); useEffect(() => {
        if (localStorage.getItem("isAuthenticated") === "true") {
            navigate("/");
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (registerUser.password !== registerUser.confirmPassword)
            alert("Passwords do not match");
        else {
            try {
                setIsLoading(true);
                const res = await axiosInstance.post("/auth/register", {
                    ...registerUser,
                });
                if (res.status === 200) {
                    alert(res.data.message);
                    setIsLoading(false);
                    navigate("/profile");
                }
            } catch (error) {
                alert(error.response.data.message);
                setIsLoading(false);
            }
        }
    };
    return (
        <main className="login" style={{
            backgroundImage: `url(${staff})`
        }}>
            <section className="login-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">
                            <MaterialIcons>account_circle</MaterialIcons>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={registerUser.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">
                            <MaterialIcons>phone</MaterialIcons>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Phone Number"
                            value={registerUser.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            <MaterialIcons>email</MaterialIcons>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={registerUser.email}
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
                            value={registerUser.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            <MaterialIcons>lock</MaterialIcons>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={registerUser.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">
                            <MaterialIcons>person</MaterialIcons>
                        </label>
                        <select name="role" id="role" value={registerUser.role} onChange={handleChange}>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Intern</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ margin: "1rem 0 0 0" }}>
                        <Button text="Login" variant="outline" link="/login" type="none" />
                        <Button type="submit" text="Register" />
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Register;