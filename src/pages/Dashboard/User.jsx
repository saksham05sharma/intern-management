import React, { useContext, useState } from "react";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../context/GlobalContext";

const User = () => {
    const { user } = useContext(GlobalContext);
    const [dashUser, setDashUser] = useState({ ...user });
    const handleChange = (e) => {
        setDashUser({
            ...dashUser,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <main className="dashboard dashboard-user">
            <h1>Edit Your Info</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">
                        <MaterialIcons>person</MaterialIcons>
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={dashUser.name}
                        onChange={handleChange}
                        disabled={!user.allowEdit}
                        title={user.allowEdit ? "" : "Admin has disabled editing"}
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
                        value={dashUser.phone}
                        onChange={handleChange}
                        disabled={!user.allowEdit}
                        title={user.allowEdit ? "" : "Admin has disabled editing"}
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
                        value={dashUser.password}
                        onChange={handleChange}
                        disabled={!user.allowEdit}
                        title={user.allowEdit ? "" : "Admin has disabled editing"}
                    />
                </div>
            </form>
        </main>
    );
};

export default User;