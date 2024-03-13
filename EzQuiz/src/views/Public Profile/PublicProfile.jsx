import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router";
import { getAllUsers, getUserByHandle } from "../../services/user.service";
import Avatar from "../../components/Avatar/Avatar";
import { deleteUser } from "firebase/auth";
import toast from "react-hot-toast";
import { blockUser, changeRole } from "../../services/admin-functions";

export default function PublicProfile() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    handle: "",
    email: "",
    firstName: "",
    lastName: "",
    avatar: "",
    createdOn: "",
    createdQuizes: "",
    role: "",
    isAdmin: "",
  });

  useEffect(() => {
    getAllUsers()
      .then((users) => users.map((user) => user.val()))
      .then((userData) => setUsers(userData));
  }, [user]);

  const { handle } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserByHandle(handle).then((snapshot) => {
      if (snapshot.exists()) {
        setUser({
          handle: snapshot.val().handle,
          email: snapshot.val().email,
          firstName: snapshot.val().firstName,
          lastName: snapshot.val().lastName,
          avatar: snapshot.val().avatar,
          createdOn: new Date(snapshot.val().createdOn).toLocaleDateString(),
          role: snapshot.val().role,
          phoneNumber: snapshot.val().phoneNumber,
          score: snapshot.val().score,
        });
      } else {
        navigate("*");
      }
    });
  }, [handle, navigate]);

  const removeUser = async (handle) => {
    try {
      await deleteUser(handle);
      setUsers(users.filter((user) => user.handle !== handle));
      toast.success(`User ${handle} has been deleted`);
      navigate(-1);
    } catch (error) {
      toast.error(`Could not delete user ${user.handle}`);
    }
  };

  return (
    <div>
      <h1>Public Profile</h1>
      <div>
        <Avatar
          width="200px"
          height="200px"
          url={user.avatar}
          onClick={() => {}}
        />
        <strong>Username: </strong> {user.handle}
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Created on:</strong> {user.createdOn}
        </p>
        <p>
          <strong>Rooms:</strong> {user.rooms}
        </p>
        <p>
          <strong>Score:</strong> {user.score}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span>
            {user.blocked ? (
              <span style={{ color: "rgb(255, 45, 45)" }}>Blocked</span>
            ) : (
              <span style={{ color: "rgb(45, 255, 45)" }}>Active</span>
            )}
          </span>
        </p>
        <p>
          <button
            onClick={() => {
              user.handle && removeUser(user.handle);
            }}
          >
            Delete user
          </button>
        </p>
        <p>
          {user.role === "educator" ? (
            <button
              onClick={() => {
                user.handle && changeRole(user, setUser);
              }}
            >
              Change role to Student
            </button>
          ) : (
            <button
              onClick={() => {
                user.handle && changeRole(user, setUser);
              }}
            >
              Change role to Educator
            </button>
          )}
        </p>
        <p>
          <button
            onClick={() => {
              user.handle && blockUser(user, setUser);
            }}
          >
            {user.blocked ? "Unblock user" : "Block user"}
          </button>
        </p>
      </div>
    </div>
  );
}
