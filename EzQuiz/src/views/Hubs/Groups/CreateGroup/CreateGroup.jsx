import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { getAllUsers, updateUserData } from "../../../../services/user.service";
import "./CreateGroup.css";
import toast from "react-hot-toast";
import { createHub, updateHub } from "../../../../services/hub.service";
import { defaultCoverGroup } from "../../../../constants/constants";
import { deleteCoverImage } from "../../../../services/storage.service";
import { v4 } from "uuid";
import ChangeCover from "../../../../components/ChangeCoverImage/ChangeCoverImage";
import { getAllQuizzesFromDatabase } from "../../../../services/quiz.service";
import DropdownSelectQuizzes from "../../../../components/Dropdown/DropdownSelectQuizzes/DropdownSelectQuizzes";
import DropdownSelectUsers from "../../../../components/Dropdown/DropdownSelectUsers/DropdownSelectUsers";

export default function CreateGroup() {
  const { userData, setContext } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [group, setGroup] = useState({
    name: "",
    description: "",
    creator: userData.handle,
  });

  const [selectedEducators, setSelectedEducators] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [attachedImg, setAttachedImg] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultCoverGroup);
  const [changeCover, setChangeCover] = useState(false);
  const [uuid, setUuid] = useState(v4());

  useEffect(() => {
    if (userData && userData.handle) {
      getAllUsers()
        .then((users) => users.map((user) => user.val()))
        .then((data) =>
          data.filter(
            (u) => u.role === "educator" && userData.handle !== u.handle
          )
        )
        .then((data) =>
          setUsers(data.map((u) => ({ value: u.handle, label: u.handle })))
        )

        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.handle) {
      getAllQuizzesFromDatabase("creator")
        .then((quizzes) =>
          quizzes.filter((quiz) => quiz.creator === userData.handle)
        )
        .then((data) =>
          setQuizzes(data.map((q) => ({ value: q.id, label: q.title })))
        )
        .catch((error) => console.log(error));
    }
  }, [userData]);

  const handleOnChange = (key) => (e) => {
    setGroup({ ...group, [key]: e.target.value });
  };

  const handleCreateGroup = async () => {
    let id;
    try {
      if (!group.name) {
        throw new Error("Please provide a Group name!");
      }
      id = await createHub(
        group.name,
        userData.handle,
        imageUrl,
        "groups",
        uuid,
        group.description
      );
      for (const user in selectedEducators) {
        await updateHub(
          "groups",
          id,
          "participants",
          selectedEducators[user].value,
          "pending"
        );
      }
      for (const quiz in selectedQuizzes) {
        await updateHub(
          "groups",
          id,
          "quizzes",
          selectedQuizzes[quiz].value,
          selectedQuizzes[quiz].value
        );
      }

      await updateUserData(userData.handle, `groups/${id}`, group);

      toast.success("Your group has been successfully created!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      userData.groups = { ...userData.groups, [id]: group };
      setContext((prev) => prev, userData);
      reset();
    }
  };

  const reset = () => {
    setGroup({
      name: "",
      description: "",
      creator: userData.handle,
      uuid: "",
    });
    setSelectedQuizzes([]);
    setSelectedEducators([]);
    setUuid(v4());
    setImageUrl(defaultCoverGroup);
    setAttachedImg(null);
    setChangeCover(false);
  };

  return (
    <div className="create-group-container w-3/5 mx-auto">
      <h2 className="mb-4 font-extrabold leading-none tracking-tight text-neutral-800 md:text-4xl lg:text-4xl">
        Create exclusive{" "}
        <span className="text-yellow-400">educator groups</span> for
        collaborative{" "}
        <span className="text-yellow-400">quiz creation and assessment</span>
      </h2>
      <br />
      <p className="text-lg font-normal text-neutral-600 lg:text-xl">
        Collaborate with fellow educators to tailor quizzes to your teaching
        needs and analyze participant performance. Whether refining teaching
        materials, conducting assessments, or hosting engaging quiz nights, this
        feature ensures effective management and analysis of participant
        performance.
      </p>
      <div className="create-group-box -mt-10">
        <div className="block rounded-xl bg-neutral-50 p-16 text-surface shadow-neutral-500 shadow-lg m-12 mx-auto">
          {!changeCover ? (
            <div className="attached-hub-image-container">
              <img
                className="attached-hub-image shadow-xl shadow-neutral-800 mx-auto w-11/12"
                src={imageUrl}
                style={{ backgroundPosition: "100%" }}
              />
              <button
                type="button"
                onClick={() => setChangeCover(true)}
                data-te-ripple-init
                data-te-ripple-color="light"
                className="hub-image-button  inline-block w-2/6  rounded-lg bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-neutral-900 shadow-lg  shadow-neutral-900 transition duration-150 ease-in-out  focus:outline-none focus:ring-0"
              >
                Change Cover
              </button>
            </div>
          ) : (
            <ChangeCover
              attachedImg={attachedImg}
              setAttachedImg={setAttachedImg}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              uuid={uuid}
              setChangeCover={setChangeCover}
              keyComponent="groups"
            />
          )}
          <br />
          <div className="w-11/12 mx-auto">
            <p className="text-lg font-normal text-neutral-600 lg:text-xl">
              Set Group name:
            </p>
            <input
              className="pl-3 outline-none border-none2 rounded-md p-2 w-full focus:border-blue-500 transition duration-300 ease-in-out shadow-lg shadow-neutral-400 mt-4"
              type="text"
              placeholder="Add group name..."
              value={group.name}
              onChange={handleOnChange("name")}
            />
            <br />
            <br />
            <br />
            <p className="text-lg font-normal text-neutral-600 lg:text-xl">
              Write a short description:
            </p>
            <input
              className="pl-3 outline-none border-none2 rounded-md p-2 w-full focus:border-blue-500 transition duration-300 ease-in-out shadow-lg shadow-neutral-400 mt-4"
              type="text"
              placeholder="Write a short description of the group..."
              value={group.description}
              onChange={handleOnChange("description")}
            />
            <br />
            <br />
            <br />
            <p className="text-lg font-normal text-neutral-600 lg:text-xl">
              Select educators to join your group:
            </p>
            <br />
            <DropdownSelectUsers
              users={users}
              selectedUsers={selectedEducators}
              setSelectedUsers={setSelectedEducators}
            />
            <br />
            <br />
            <p className="text-lg font-normal text-neutral-600 lg:text-xl">
              Select quizzes:
            </p>
            <br />
            <DropdownSelectQuizzes
              quizzes={quizzes}
              selectedQuizzes={selectedQuizzes}
              setSelectedQuizzes={setSelectedQuizzes}
            />
            <br />
            <br />
            <button
              type="button"
              onClick={handleCreateGroup}
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mb-6 inline-block w-2/6 ml-5 mt-3 rounded-lg bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-neutral-900 shadow-lg  shadow-neutral-400 transition duration-150 ease-in-out  focus:outline-none focus:ring-0"
            >
              Create Group
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                attachedImg && deleteCoverImage("groups", uuid);
              }}
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mb-6 inline-block w-2/6 ml-5 rounded-lg bg-neutral-900 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-lg shadow-neutral-400 transition duration-150 ease-in-out  focus:outline-none focus:ring-0"
            >
              Reset Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
