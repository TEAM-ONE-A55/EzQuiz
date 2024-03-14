import { useContext, useEffect, useState } from "react";
import GroupSimpleView from "../GroupSimpleView/GroupSimpleView";
import "./MyGroups.css";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import PropTypes from "prop-types";
import {
  getUserByHandle,
  updateUserData,
} from "../../../services/user.service";
import {
  deleteHub,
  getHubsById,
  updateHub,
} from "../../../services/hub.service";
import {
  deleteCoverImage,
  getCoverImage,
} from "../../../services/storage.service";
import { defaultCoverGroup } from "../../../constants/constants";

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
      const room = await getHubsById("groups", groupId);
      if (room.participants) {
        const participants = room.participants;
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
        <>
          <div className="my-groups-content">
            <h2 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
              My{" "}
              <span className="text-blue-600 dark:text-blue-500">Groups</span>
            </h2>
            <br />

            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Your personalized hubs for seamless collaborating with fellow
              educators to tailor quizzes to your teaching needs and analyze
              participant performance.
            </p>
          </div>
          <div className="groups-container">
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
        </>
      ) : (
        <div className="my-groups-content">
          <p className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            {" "}
            You don&apos;t have any groups yet.
          </p>

          <br />
          <Button onClick={() => navigate("/create-group")}>
            Create Group
          </Button>
          <br />
          <br />
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            If you haven&apos;t created any groups yet, you can start by
            creating one. Click on the &quot;Create Group&quot; button to
            initiate the process.
          </p>
          <br />
          <br />
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            If you&apos;ve been invited to join a group, make sure to accept the
            invitation. Check your notifications to see if there are any pending
            group invites.
          </p>
        </div>
      )}
    </div>
  );
}

MyGroups.propTypes = {
  notifications: PropTypes.object,
};
