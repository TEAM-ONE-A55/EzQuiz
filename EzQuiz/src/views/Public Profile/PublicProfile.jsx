import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router";
import { getAllUsers, getUserByHandle } from "../../services/user.service";
import { getAllHubs } from "../../services/hub.service";
import { deleteUser } from "firebase/auth";
import toast from "react-hot-toast";
import { blockUser, changeRole } from "../../services/admin-functions";
import {
  faCalendar,
  faEnvelope,
  faUserCircle,
  faStar,
  faS,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRank } from "../../components/Score/scores-students";
export default function PublicProfile() {
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
  const [rank, setRank] = useState("Novice Learner");
  const [rooms, setRooms] = useState(0);

  useEffect(() => {
    if (user) {
      try {
        setRank(getRank(user.score));
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

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
          rank: snapshot.val().rank,
        });
      } else {
        navigate("*");
      }
    });
  }, [handle, navigate]);

  useEffect(() => {
    getAllHubs("rooms")
      .then((room) =>
        room.filter((room) =>
          Object.keys(room.participants).includes(user.handle)
        )
      )
      .then((rooms) => setRooms(rooms.length));
  }, [user.handle]);

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
        <img
          src={user.avatar}
          alt={user.firstName + "" + user.lastName}
          className="w-40 h-40 rounded-full shadow-lg dark:shadow-black/30 mx-auto"
        />
        <p className="mb-2 font-semibold text-primary dark:text-primary-400">
          @{user?.handle}
        </p>
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>
            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> :{" "}
          </strong>{" "}
          {user.email}
        </p>
        <p>
          <strong>
            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon> :{" "}
          </strong>{" "}
          {user.role}
        </p>
        <p>
          <strong>
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> :{" "}
          </strong>{" "}
          {user.createdOn}
        </p>
        {user.score ? (
          <p>
          <strong>
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>:
          </strong>{" "}
          {user.score}
        </p>
        ) : (
          <p>
            No quizzes taken yet
          </p>
        )}
        {rank ? (
          <p>
          <strong>
            <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
          </strong>
          : {rank}
        </p>
        ) : (
          <p>
            No rank
          </p>
        )}
        {rooms  ? (
          <p>
          <strong>Rooms:</strong> {rooms}
        </p>
        ) : (
          <p>
          <strong>Rooms:</strong> 0
        </p>
        )}
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
            type="button"
            className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
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
              type="button"
              className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
              onClick={() => {
                user.handle && changeRole(user, setUser);
              }}
            >
              Change role to Student
            </button>
          ) : (
            <button
              type="button"
              className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
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
            type="button"
            className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
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
