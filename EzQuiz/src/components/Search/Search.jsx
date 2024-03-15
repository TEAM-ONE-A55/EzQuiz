import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user.service";
import { useNavigate } from "react-router";
import SortingDropdown from "../Dropdown/Dropdown";
import { getAllHubs } from "../../services/hub.service";
import { searchingOptions } from "../../constants/constants";

export default function Search() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");

  const getQuizzes = async () => {
    const allQuizzes = await getAllHubs("quizzes");
    setQuizzes(allQuizzes);
  };

  const getRooms = async () => {
    const allRooms = await getAllHubs("rooms");
    setRooms(allRooms);
  };

  const getGroups = async () => {
    const allGroups = await getAllHubs("groups");
    setGroups(allGroups);
  };
  useEffect(() => {
    getQuizzes();
    getRooms();
    getGroups();
    getAllUsers()
      .then((users) => users.map((user) => user.val()))
      .then((users) => setUsers(users));
  }, [search]);

  const handleSearchChange = (search) => {
    setSearch(search);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const navigate = useNavigate();

  return (
    <div>
      <h1>Search</h1>
      <SortingDropdown
        options={searchingOptions}
        defaultOption="users"
        onChange={handleSearchChange}
      />
      <br /> <br />
      <input
        type="text"
        placeholder={`Search ${search}...`}
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)}
      />
      {search === "users" && (
        <div>
          {searchTerm !== "" && <strong>Results for: {searchTerm}</strong>}
          {searchTerm !== "" &&
            users
              .filter((user) =>
                user.handle.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <div key={user.handle}>
                  <div>
                    {user.handle}{" "}
                    <button onClick={() => navigate(`/profile/${user.handle}`)}>
                      See Profile
                    </button>
                  </div>
                </div>
              ))}
        </div>
      )}
      {search === "rooms" && (
        <div>
          {searchTerm !== "" && <strong>Results for: {searchTerm}</strong>}
          {searchTerm !== "" &&
            rooms
              .filter((room) => {
                room.name.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map((room) => (
                <div key={room.name}>
                  <div>{room.name}</div>
                </div>
              ))}
        </div>
      )}
      {search === "groups" && (
        <div>
          {searchTerm !== "" && <strong>Results for: {searchTerm}</strong>}
          {searchTerm !== "" &&
            groups
              .filter((group) =>
                group.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((group) => (
                <div key={group.name}>
                  <div>{group.name}</div>
                </div>
              ))}
        </div>
      )}
      {search === "rooms" && (
        <div>
          {searchTerm !== "" &&
            rooms
              .filter((room) =>
                room.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((room) => (
                <div key={room.name}>
                  <div>{room.name}</div>
                </div>
              ))}
        </div>
      )}
      {search === "groups" && (
        <div>
          {searchTerm !== "" &&
            groups
              .filter((group) => {
                group.name.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map((group) => (
                <div key={group.name}>
                  <div>{group.name}</div>
                </div>
              ))}
        </div>
      )}
      {search === "quizzes" && (
        <div>
          {searchTerm !== "" && <strong>Results for: {searchTerm}</strong>}
          {searchTerm !== "" &&
            quizzes
              .filter((quiz) =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((quiz) => (
                <div key={quiz.title}>
                  <div>{quiz.title}</div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
