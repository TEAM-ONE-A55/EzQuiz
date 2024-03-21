import { useEffect, useState } from "react";
import { deleteHub, getHubsById, updateHub } from "../../../services/hub.service";
import {
  getAllUsers,
  getUserByHandle,
  updateUserData,
} from "../../../services/user.service";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllQuizzesFromDatabase } from "../../../services/quiz.service";
import DropdownSelectQuizzes from "../../../components/Dropdown/DropdownSelectQuizzes/DropdownSelectQuizzes";
import DropdownSelectUsers from "../../../components/Dropdown/DropdownSelectUsers/DropdownSelectUsers";
import Button from "../../../components/Button/Button";
import SimpleQuiz from "../../Quizzes/SimpleQuiz/SimpleQuiz";
import PropTypes from "prop-types";
import "./SingleHub.css";
import toast from "react-hot-toast";
import { defaultCoverRoom } from "../../../constants/constants";
import {
  deleteCoverImage,
  getCoverImage,
} from "../../../services/storage.service";

export default function SingleHub({
  hubType,
  participantRole,
  hub,
  setHub,
  userData,
  id,
}) {
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

  const navigate = useNavigate();

  useEffect(() => {
    getHubsById(hubType, id).then(setHub);
  }, [usersChange, quizzesChange]);

  useEffect(() => {
    if (hub.participants) {
      const promises = Object.keys(hub.participants).map(async (p) => {
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

    getUserByHandle(hub.creator)
      .then((snapshot) => setCreator(snapshot.val()))
      .then(setHasCreator(true));

    if (hub && hub.quizzes) {
      const promises = Object.keys(hub.quizzes).map((id) => {
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
  }, [hub]);

  useEffect(() => {
    if (userData && userData.handle) {
      getAllUsers()
        .then((users) => users.map((user) => user.val()))
        .then((data) =>
          data.filter(
            (u) => u.role === participantRole && userData.handle !== u.handle
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

  const removeUser = async (hubId, user) => {
    await updateHub(hubType, hubId, "participants", user, null);
    await updateUserData(user, `${hubType}/${hubId}`, null);
    const updatedParticipants = participants.filter((p) => p.handle !== user);
    setParticipants(updatedParticipants);
  };

  const addUsers = async () => {
    try {
      if (selectedParticipants.length !== 0) {
        for (const user in selectedParticipants) {
          await updateHub(
            hubType,
            id,
            "participants",
            selectedParticipants[user].value,
            "pending"
          );
        }
      } else {
        toast.error("Select users to proceed with invitations!");
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setSelectedParticipants([]);
      setUsersChange(usersChange + 1);
      setOnClickAddMember(false);
    }
  };

  const addQuizzes = async () => {
    try {
      if (selectedQuizzes.length !== 0) {
        for (const quiz in selectedQuizzes) {
          await updateHub(
            hubType,
            id,
            "quizzes",
            selectedQuizzes[quiz].value,
            selectedQuizzes[quiz].value
          );
        }
      } else {
        toast.error("Select quizzes to proceed!");
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setSelectedQuizzes([]);
      setQuizzesChange(quizzesChange + 1);
      setOnClickAddQuiz(false);
    }
  };

  const removeQuiz = async (hubId, quizId) => {
    await updateHub(hubType, hubId, "quizzes", quizId, null);
    const updateQuizzes = quizzes.filter((q) => q.id !== quizId);
    setQuizzes(updateQuizzes);
  };

  const deleteHubEverywhere = async (hubType, hubId, uuid, coverUrl) => {
    try {
      const room = await getHubsById(hubType, hubId);
      if (room.participants) {
        const participants = room.participants;
        Object.entries(participants).map((p) => {
          if (p[1] === "accepted") {
            updateUserData(p[0], `${hubType}/${hubId}`, null);
          }
        });
      }

      if (coverUrl !== defaultCoverRoom) {
        const coverImage = await getCoverImage(hubType, uuid);
        const coverImagePath = coverImage._location.path.split("/");
        const coverImageId = coverImagePath[1];
        await deleteCoverImage(hubType, coverImageId);
      }
      await updateUserData(userData.handle, `${hubType}/${hubId}`, null);
      await deleteHub(hubType, hubId);


      toast.success(
        `Your ${hubType.slice(
          0,
          hubType.length - 1
        )} has been deleted successfully.`
      );
      navigate(`/my-${hubType}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const leaveHub = async (hubId) => {
    try {
      await updateUserData(userData.handle, `${hubType}/${hubId}`, null);
      await updateHub(hubType, hubId, "participants", userData.handle, "left");
      toast.success(
        `Left the ${hubType.slice(0, hubType.length - 1)} successfully.`
      );
      navigate(`/my-${hubType}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    hub && (
      <div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              backgroundImage: `url(${hub.image_cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
            }}
          ></div>
        </div>
        <div
          className="block rounded-xl bg-neutral-50 p-16 text-surface shadow-neutral-500 shadow-lg mx-auto w-3/5 mt-32"
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "600px",
            overflowY: "auto",
            zIndex: "10",
          }}
        >
          <div className="text-center">
            <h2 className="mb-12 mt-6 font-extrabold leading-none tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
              {hub.name}
            </h2>
            {hubType === "groups" && (
              <h3 className="mb-6 text-2xl pb-2 text-neutral-600 dark:text-neutral-300 md:mb-12 md:pb-0">
                {hub.description}
              </h3>
            )}
          </div>

          <br />
          {hasCreator && (
            <div className="text-center">
              <div className="mb-6">
                <img
                  src={creator.avatar}
                  alt={creator.firstName + " " + creator.lastName}
                  className="w-20 h-20 rounded-full shadow-lg mx-auto border-none shadow-neutral-700"
                />
              </div>
              <span className="mb-2 font-extrabold text-neutral-900 text-lg">
                Creator: @{creator.handle}
              </span>
            </div>
          )}
        </div>

        <div className=" mt-80">
          {userData.handle === hub.creator ? (
            <div className=" mx-auto">
              <button
                type="button"
                onClick={() =>
                  deleteHubEverywhere(hubType, hub.id, hub.uuid, hub.image_cover)
                }
                data-te-ripple-init
                data-te-ripple-color="light"
                className="inline-block w-1/6 rounded px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-neutral-800 hover:shadow-lg transition duration-150 ease-in-out "
              >
                Delete {hubType.slice(0, hubType.length - 1)}
              </button>
            </div>
          ) : (
            <div className=" mx-auto">
              <button
                type="button"
                onClick={() => leaveHub(id)}
                data-te-ripple-init
                data-te-ripple-color="light"
                className="inline-block w-1/6 rounded px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-neutral-800 hover:shadow-lg transition duration-150 ease-in-out "
              >
                Leave {hubType.slice(0, hubType.length - 1)}
              </button>
            </div>
          )}
          <br />
          <h5 className="mb-12 mt-6 leading-none font-bold tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
            {" "}
            {userData.role === "student" ? "Participants" : "Members"}{" "}
          </h5>
          <br />
          {(userData.role === "educator" ||
            userData.handle === hub.creator) && (
            <div className="-mt-10 mb-20">
              <div className="w-3/5 mx-auto flex-col">
                <button
                  type="button"
                  onClick={() => setOnClickAddMember(!onClickAddMember)}
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mb-6 inline-block w-full rounded bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-neutral-800 shadow-lg shadow-neutral-400 transition duration-150 ease-in-out "
                >
                  {!onClickAddMember ? "Invite Members" : "Cancel Invitations"}
                </button>
              </div>
              {onClickAddMember && (
                <>
                  <br />
                  <div className="w-3/5 mx-auto">
                    <div className="w-3/4 mx-auto">
                      <DropdownSelectUsers
                        users={users}
                        selectedUsers={selectedParticipants}
                        setSelectedUsers={setSelectedParticipants}
                      />
                    </div>
                  </div>

                  <div className="w-1/5 mx-auto mt-5">
                    <br />
                    <Button onClick={addUsers}>Send Invitations</Button>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="w-3/5 grid grid-cols-4 mx-auto gap-y-10 -mt-10 mb-10">
            {hasParticipants &&
              participants.map((p) => {
                if (p.handle !== creator)
                  return (
                    <div
                      key={p.handle}
                      className={
                        userData.handle !== p.handle
                          ? "mx-4 mb-6 "
                          : "mx-4 mb-6 bg-yellow-400 userData-handle"
                      }
                    >
                      <div className="text-center">
                        <div className="mb-6">
                          <img
                            src={p.avatar}
                            alt={p.firstName + " " + p.lastName}
                            className="w-32 h-32 rounded-full shadow-lg mx-auto border-none shadow-neutral-700"
                          />
                        </div>
                        <h5 className="mb-2 text-xl font-semibold text-neutral-800">
                          {p.firstName} {p.lastName}
                        </h5>
                        <h6 className="mb-2 font-bold text-neutral-900 ">
                          @{p.handle}
                        </h6>
                        <br />
                        <div className="flex justify-center items-center mb-2 text-neutral-800">
                          <span className="material-symbols-outlined mr-2">
                            smartphone
                          </span>
                          {p.phoneNumber || "Not provided"}
                        </div>
                        <div className="flex justify-center items-center mb-2 text-neutral-800">
                          <span className="material-symbols-outlined mr-2">
                            email
                          </span>
                          {p.email || "Not provided"}
                        </div>
                        <div className="flex justify-center items-center mb-2 text-neutral-800">
                          <p>
                            <span className="font-bold">Status: </span>
                            <span>
                              {" "}
                              {
                                Object.entries(hub.participants)
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
                        {userData.handle === hub.creator && (
                          <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                            <Button onClick={() => removeUser(id, p.handle)}>
                              Remove
                            </Button>
                          </div>
                        )}
                        {userData.handle === p.handle &&
                          userData.handle !== hub.creator && (
                            <div className="flex justify-center items-center mb-2 text-neutral-600 dark:text-neutral-300">
                              <Button onClick={() => leaveHub(id)}>
                                Leave{" "}
                                {hubType.toUpperCase()[0] +
                                  hubType.slice(1, hubType.length - 1)}
                              </Button>
                            </div>
                          )}
                      </div>
                    </div>
                  );
              })}
          </div>
          <div className="block rounded-xl bg-yellow-400 p-16 text-surface shadow-neutral-500 shadow-lg mx-auto w-3/5">
            <h5 className="leading-none font-bold tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
              Quizzes
            </h5>
            {userData.role !== "student" && (
              <div className="mt-12">
                <Button onClick={() => setOnClickAddQuiz(!onClickAddQuiz)}>
                  {!onClickAddQuiz ? "Select Quizzes" : "Cancel"}
                </Button>
                {onClickAddQuiz && (
                  <>
                    <Button onClick={addQuizzes}>Add Quizzes</Button>
                    <br />
                    <br />
                    <div className="w-3/4 mx-auto">
                      <DropdownSelectQuizzes
                        quizzes={availableQuizzes}
                        selectedQuizzes={selectedQuizzes}
                        setSelectedQuizzes={setSelectedQuizzes}
                      />
                    </div>
                    <br />
                    <br />
                    {availableQuizzes.length === 0 && (
                      <p className=" text-neutral-900">
                        No quizzes are currently available.{" "}
                        <NavLink
                          className=" text-neutral-900 font-extrabold"
                          to="/create-quiz"
                        >
                          Why not create one now?
                        </NavLink>
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          {hasQuizzes && quizzes.length !== 0 && (
            <div className=" w-3/5 grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
              {quizzes.map((quiz) => (
                <div key={quiz.id}>
                  <div className="flex flex-col gap-10">
                    <SimpleQuiz
                      key={quiz.id}
                      quiz={quiz}
                      setChange={setQuizzesChange}
                      hubType={hubType}
                      hubId={hub.id}
                      groupView={true}
                    />
                    {userData.role === "educator" && (
                      <div className="w-full mx-auto -mt-4">
                        <Button onClick={() => removeQuiz(hub.id, quiz.id)}>
                          Remove Quiz
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
}

SingleHub.propTypes = {
  hubType: PropTypes.string.isRequired,
  participantRole: PropTypes.string.isRequired,
  hub: PropTypes.object.isRequired,
  setHub: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
