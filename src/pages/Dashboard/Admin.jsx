import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const Admin = () => {
    const { axiosInstance } = useContext(GlobalContext);
    const [allUsers, setAllUsers] = useState([]);

    const fetchAllUsers = async () => {
        try {
            const { data } = await axiosInstance.get("/admin/get-all-users");
            console.info(data);
            setAllUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const allowUserToEdit = async (id) => {
        console.log(allUsers.find((user) => user._id === id));
        try {
            const { data } = await axiosInstance.put(`/admin/allow-user-to-edit/${id}`, {
                allowEdit: !allUsers.find((user) => user._id === id).allowEdit,
            });
            console.info(data);
            setAllUsers((prev) => prev.map((user) => (user._id === id ? data.user : user)));
            alert(data.message);
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);


    return (
        <main className="dashboard dashboard-admin">
            <h1>Admin Dashboard</h1>
            <section className="dashboard-users">
                <table>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No.</th>
                            <th>Role</th>
                            <th>Allow Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    <a href={`tel:${user.phone}`}>{user.phone}</a>
                                </td>
                                <td>{user.role}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name="allowEdit"
                                        id="allowEdit"
                                        checked={user.allowEdit}
                                        onChange={() => allowUserToEdit(user._id)}
                                    />
                                    <label htmlFor="allowEdit"></label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
};

export default Admin;