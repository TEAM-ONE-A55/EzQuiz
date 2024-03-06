import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user.service";

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
    console.log(users);
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <h2>Total Users: {users.length}</h2> <br />
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>Role</th>
            <th>Date of registration</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.val().handle}</td>
              <td>{user.val().firstName}</td>
              <td>
                {user.val().role === "admin" ? (
                  <span style={{ color: "rgb(255, 45, 45)" }}>
                    {user.val().role}
                  </span>
                ) : user.val().role === "educator" ? (
                  <span style={{ color: "rgb(45, 45, 255)" }}>
                    {user.val().role}
                  </span>
                ) : (
                  <span style={{ color: "rgb(45, 255, 45)" }}>
                    {user.val().role}
                  </span>
                )}
              </td>
              <td>{new Date(user.val().createdOn).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
