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
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
            id="exampleSearch"
            placeholder={`Search ${search}...`}
          />
        </div>
      </div>
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
                    <div>
                      <span>
                        <img
                          src={user.avatar}
                          alt=""
                          className="h-4 w-4 border-none mb-0.5 rounded-full"
                        />
                      </span>
                      <span>{user.handle} </span>
                    </div>
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
