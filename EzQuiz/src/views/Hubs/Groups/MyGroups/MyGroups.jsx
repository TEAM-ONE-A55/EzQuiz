import { useContext, useEffect, useState } from "react";
import GroupSimpleView from "../GroupSimpleView/GroupSimpleView"
import { AppContext } from "../../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getUserByHandle,
  updateUserData,
} from "../../../../services/user.service";
import {
  deleteHub,
  getHubsById,
  updateHub,
} from "../../../../services/hub.service";
import {
  deleteCoverImage,
  getCoverImage,
} from "../../../../services/storage.service";
import { defaultCoverGroup } from "../../../../constants/constants";

export default function MyGroups({ notifications }) {
  const { userData } = useContext(AppContext);
  const [groupsIds, setGroupsIds] = useState([]);
  const [hasGroups, setHasGroups] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groups, setGropups] = useState([]);
  const [numGroups, setNumGroups] = useState(0);
  const navigate = useNavigate();

  const addGroup = (groupId) => {
    setGroupsIds((prevGroupsIds) => {
      if (prevGroupsIds.length !== 0 && !prevGroupsIds.includes(groupId)) {
        return [...prevGroupsIds, groupId];
      } else if (prevGroupsIds.length === 0) {
        return [groupId];
      }
      return prevGroupsIds;
    });
    setNumGroups((prevNumGroups) => prevNumGroups + 1);
  };

  const leaveGroup = async (groupId) => {
    try {
      await updateUserData(userData.handle, `groups/${groupId}`, null);
      await updateHub(
        "groups",
        groupId,
        "participants",
        userData.handle,
        "left"
      );
      setGroupsIds((prevGroupsIds) => {
        const newPrevGroupsIds = prevGroupsIds.filter((id) => id !== groupId);
        return newPrevGroupsIds;
      });
      setNumGroups((prevGroupsIds) => prevGroupsIds - 1);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteGroup = async (groupId, uuid, coverUrl) => {
    try {
      const group = await getHubsById("groups", groupId);
      if (group.participants) {
        const participants = group.participants;
        Object.entries(participants).map((p) => {
          if (p[1] === "accepted") {
            updateUserData(p[0], `groups/${groupId}`, null);
          }
        });
      }

      await updateUserData(userData.handle, `groups/${groupId}`, null);
      await deleteHub("groups", groupId);

      if (coverUrl !== defaultCoverGroup) {
        const coverImage = await getCoverImage("groups", uuid);
        const coverImagePath = coverImage._location.path.split("/");
        const coverImageId = coverImagePath[1];
        await deleteCoverImage("groups", coverImageId);
      }

      setGroupsIds((prevGroupsIds) => {
        const newPrevGroupsIds = prevGroupsIds.filter((id) => id !== groupId);
        return newPrevGroupsIds;
      });
      setNumGroups((prevGroupsIds) => prevGroupsIds - 1);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserByHandle(userData.handle)
      .then((snapshot) => snapshot.val().groups)
      .then((groups) => Object.keys(groups))
      .then((groups) => groups.map((group) => addGroup(group)))
      .then(() => {
        !hasGroups && setHasGroups(true);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, [userData, notifications]);

  useEffect(() => {
    if (groupsIds.length !== 0) {
      const groupsPromises = groupsIds.map((groupId) => {
        return getHubsById("groups", groupId)
          .then((group) => group)
          .catch((e) => console.log(e.message));
      });

      Promise.all(groupsPromises)
        .then((groupsData) => {
          setGropups(groupsData);
          setLoading(false);
        })
        .catch((e) => console.log(e.message));
    } else {
      setHasGroups(false);
    }
  }, [numGroups]);

  return (
    <div>
      {userData && userData.groups && hasGroups ? (
        <div className="mt-8 max-w-screen-xl mx-auto">
          <div className="">
            <h2 className="mb-4 font-extrabold leading-none tracking-tighter text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
              My{" "}
              <span className="text-yellow-400">Groups</span>
            </h2>

            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Your personalized hubs for seamless collaborating with fellow
              educators to tailor quizzes to your teaching needs and analyze
              participant performance.
            </p>
          </div>
          <div className="grid grid-cols-4 mt-16 max-w-screen-xl m-auto justify-items-center gap-y-16">
            {groups.length !== 0 &&
              groups.map((group) => {
                return (
                  <div key={group.id}>
                    <GroupSimpleView
                      group={group}
                      hasGroups={hasGroups}
                      loading={loading}
                      leaveGroup={leaveGroup}
                      deleteGroup={deleteGroup}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="w-3/5 mx-auto mt-16">
          <p className="font-extrabold leading-none tracking-tighter text-gray-900 md:text-5xl lg:text-4xl">
            {" "}
            You aren&apos;t participating in any groups yet.
          </p>
          <div className="my-8">
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                  However, you can start by
                  creating one. If you&apos;ve been invited to join a group, make sure to accept the
                  invitation. Check your notifications to see if there are any pending
                  group invites.
            </p>
            <button 
            className="w-[40%] mx-auto my-8 block rounded-lg bg-yellow-400 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800"
            onClick={() => navigate("/create-group")}>
              Create Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

MyGroups.propTypes = {
  notifications: PropTypes.object,
};
