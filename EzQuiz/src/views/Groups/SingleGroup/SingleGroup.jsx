import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router";
import { getHubsById, updateHub } from "../../../services/hub.service";
import {
  getAllUsers,
  getUserByHandle,
  updateUserData,
} from "../../../services/user.service";
import Button from "../../../components/Button/Button";
import "./SingleGroup.css";
import DropdownSelectQuizzes from "../../../components/Dropdown/DropdownSelectQuizzes/DropdownSelectQuizzes";
import DropdownSelectUsers from "../../../components/Dropdown/DropdownSelectUsers/DropdownSelectUsers";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
import SimpleQuiz from "../../Quizzes/SimpleQuiz/SimpleQuiz";

export default function SingleGroup() {
  const { userData } = useContext(AppContext);
  const { id } = useParams();
  const [group, setGroup] = useState({
    name: "",
    description: "",
    image_cover: "",
    creator: "",
    participants: {},
    uuid: "",
  });

  const [participants, setParticipants] = useState([]);
  const [hasParticipants, setHasParticipants] = useState(false);

  const [creator, setCreator] = useState({});
  const [hasCreator, setHasCreator] = useState(false);

  const [quizzes, setQuizzes] = useState([]);
  const [hasQuizzes, setHasQuizzes] = useState(false);
  const [quizzesChange, setQuizzesChange] = useState(0);

  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersChange, setUsersChange] = useState(0);

  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);

  const [onClickAddQuiz, setOnClickAddQuiz] = useState(false);
  const [onClickAddMember, setOnClickAddMember] = useState(false);

  useEffect(() => {
    getHubsById("groups", id).then(setGroup);
  }, [usersChange, quizzesChange]);

  useEffect(() => {
    console.log("useEffect get users for dropdown");
    if (group.participants) {
      const promises = Object.keys(group.participants).map(async (p) => {
        return getUserByHandle(p).then((snapshot) => ({
          handle: snapshot.val().handle,
          avatar: snapshot.val().avatar,
          email: snapshot.val().email,
          phoneNumber: snapshot.val().phoneNumber,
          firstName: snapshot.val().firstName,
          lastName: snapshot.val().lastName,
        }));
      });

      Promise.all(promises)
        .then((participantsData) => {
          setParticipants([...participantsData]);
        })
        .then(setHasParticipants(true));
    }

    getUserByHandle(group.creator)
      .then((snapshot) => setCreator(snapshot.val()))
      .then(setHasCreator(true));

    if (group.quizzes) {
      const promises = Object.keys(group.quizzes).map((id) => {
        return getAllQuizzesFromDatabase("id").then((quizzes) =>
          quizzes.filter((quiz) => quiz.id === id)
        );
      });

      Promise.all(promises)
        .then((quizzes) => {
          setQuizzes([...quizzes].flat());
        })
        .then(setHasQuizzes(true));
    }
  }, [group]);

  useEffect(() => {
    console.log("useEffect get users for dropdown");
    if (userData && userData.handle) {
      getAllUsers()
        .then((users) => users.map((user) => user.val()))
        .then((data) =>
          data.filter(
            (u) => u.role === "educator" && userData.handle !== u.handle
          )
        )
        .then((data) =>
          data.filter((u) => !participants.some((p) => p.handle === u.handle))
        )
        .then((data) =>
          setUsers(data.map((u) => ({ value: u.handle, label: u.handle })))
        )

        .catch((error) => console.log(error));
    }
  }, [participants]);

  useEffect(() => {
    if (userData && userData.handle) {
      getAllQuizzesFromDatabase()
        .then((data) => data.filter((quiz) => quiz.creator === userData.handle))
        .then((data) =>
          data.filter(
            (quiz1) => !quizzes.some((quiz2) => quiz2.id === quiz1.id)
          )
        )
        .then((data) =>
          setAvailableQuizzes(
            data.map((q) => ({ value: q.id, label: q.title }))
          )
        )

        .catch((error) => console.log(error));
    }
  }, [quizzes]);

  const removeUser = async (groupId, user) => {
    await updateHub("groups", groupId, "participants", user, null);
    await updateUserData(user, `groups/${groupId}`, null);
    const updatedParticipants = participants.filter((p) => p.handle !== user);
    setParticipants(updatedParticipants);
  };

  const addUsers = async () => {
    try {
      if (selectedParticipants.length !== 0) {
        for (const user in selectedParticipants) {
          await updateHub(
            "groups",
            id,
            "participants",
            selectedParticipants[user].value,
            "pending"
          );
        }
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setSelectedParticipants([]);
      setUsersChange(usersChange + 1);
      setOnClickAddMember(false);
    }
  };

  return (
    group && (
      <div className="single-group-container">
        <div
          style={{
            position: "relative",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${group.image_cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
          }}
        >
          <div className="text-center">
            <h2 className="mb-6 text-4xl font-bold">{group.name}</h2>
            <h3 className="mb-6 text-2xl pb-2 text-neutral-600 dark:text-neutral-300 md:mb-12 md:pb-0">
              {group.description}
            </h3>
          </div>
          <br />
          {hasCreator && (
            <div className="text-center">
              <div className="mb-6">
                <img
                  src={creator.avatar}
                  alt={creator.firstName + " " + creator.lastName}
                  className="w-16 h-16 rounded-full shadow-lg dark:shadow-black/30 mx-auto"
                />
              </div>
              <h6 className="mb-2 font-semibold text-primary text-m dark:text-primary-400">
                Creator: @{creator.handle}
              </h6>
            </div>
          )}
        </div>
        <br />
        <h5 className="mb-4 text-xl font-semibold">Members: </h5>
        <Button onClick={() => setOnClickAddMember(!onClickAddMember)}>
          {!onClickAddMember ? "Invite Members" : "Cancel Invitations"}
        </Button>
        {onClickAddMember && (
          <>
            <Button onClick={addUsers}>Send Invitations</Button>
            <br />
            <br />
            <DropdownSelectUsers
              users={users}
              selectedUsers={selectedParticipants}
              setSelectedUsers={setSelectedParticipants}
            />
          </>
        )}

        <br />
        <br />
        <br />
        <div className="flex flex-wrap justify-center">
          {hasParticipants &&
            participants.map((p) => (
              <div key={p.handle} className="mx-4 mb-6">
                <div className="text-center">
                  <div className="mb-6">
                    <img
                      src={p.avatar}
                      alt={p.firstName + " " + p.lastName}
                      className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/30 mx-auto"
                    />
                  </div>
                  <h5 className="mb-2 text-xl font-semibold">
                    {p.firstName} {p.lastName}
                  </h5>
                  <h6 className="mb-2 font-semibold text-primary dark:text-primary-400">
                    @{p.handle}
                  </h6>
                  <br />
                  <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                    <span className="material-symbols-outlined mr-2">
                      smartphone
                    </span>
                    {p.phoneNumber || "Not provided"}
                  </div>
                  <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                    <span className="material-symbols-outlined mr-2">
                      email
                    </span>
                    {p.email || "Not provided"}
                  </div>
                  <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                    <p>
                      <span className="font-bold">Status: </span>
                      <span>
                        {" "}
                        {
                          Object.entries(group.participants)
                            .filter((user) => {
                              if (user[0] === p.handle) {
                                return user[1];
                              }
                            })
                            .join(" ")
                            .split(",")[1]
                        }
                      </span>
                    </p>
                  </div>
                  <br />
                  {userData.handle === group.creator && (
                    <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                      <Button onClick={() => removeUser(id, p.handle)}>
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <hr />
        <br />
        <h5 className="mb-4 text-xl font-semibold">Quizzes: </h5>
        <Button onClick={() => setOnClickAddQuiz(!onClickAddQuiz)}>
          {!onClickAddQuiz ? "Add Quizzes" : "Cancel"}
        </Button>
        <br />
        <br />
        {onClickAddQuiz && (
          <DropdownSelectQuizzes
            quizzes={availableQuizzes}
            selectedQuizzes={selectedQuizzes}
            setSelectedQuizzes={setSelectedQuizzes}
          />
        )}
        {hasQuizzes && quizzes.length !== 0 && (
          <div className="grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="flex gap-10">
                <SimpleQuiz
                  key={quiz.id}
                  quiz={quiz}
                  setChange={setQuizzesChange}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
}
