import { getHubsById } from "../../../services/hub.service";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../../context/AppContext";
import { getUserByHandle } from "../../../services/user.service";
import Loader from "../../../components/Loader/Loader";
import "./GroupSimpleView.css";

export default function GroupSimpleView() {
  const { userData } = useContext(AppContext);
  const [groups, setGroups] = useState([]);
  const [groupsIds, setGroupsIds] = useState([]);
  const [hasGroups, setHasGroups] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getUserByHandle(userData.handle)
      .then((snapshot) => {
        const availableGroups = snapshot.val().groups;

        setGroupsIds(Object.keys(availableGroups));
        setHasGroups(true);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (groupsIds.length !== 0) {
      groupsIds.map((groupId) => {
        getHubsById("groups", groupId)
          .then((group) =>
            setGroups((prev) => {
              if (prev.length === 0) {
                return [group];
              } else {
                return [...prev, group];
              }
            })
          )
          .catch((e) => console.log(e.message))
          .finally(() => {
            setGroupsIds([]);
            setLoading(false);
          });
      });
    }
  }, [hasGroups]);

  if (loading && !hasGroups) {
    return <Loader />;
  }

  if (!hasGroups && !loading) {
    return (
      <div className="my-groups-main">
        <h3>You don&apos;t have any groups yet.</h3>
        <br />
        <h4>Possible actions:</h4>
        <p>
          Create a Group: If you haven&apos;t created any groups yet, you can
          start by creating one. Click on the &quot;Create Group&quot; button to
          initiate the process.
        </p>
        <p>
          Join a Group: If you&apos;ve been invited to join a group, make sure
          to accept the invitation. Check your notifications or invitations to
          see if there are any pending group invites.
        </p>
      </div>
    );
  }

  return (
    userData &&
    userData.handle &&
    groups.length !== 0 &&
    groups.map((group) => {
      return (
        <div key={group.id} className="simple-group-container">
          <div className="block rounded-lg bg-white text-surface ">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img className="rounded-t-lg" src={group.image_cover} alt="" />
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
                {group.name}
              </h5>
              <p className="mb-4 text-base text-gray-700">
                {group.description}
              </p>
              <p className="text-base text-surface/75 dark:text-neutral-600">
                <small>Created by: {group.creator}</small>
              </p>
              <br />
              <a
                type="button"
                className="pointer-events-auto me-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary text-gray-800 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400"
                onClick={() => navigate(`/my-groups/${group.id}`)}
              >
                Enter group
              </a>
              {userData.handle !== group.creator ? (
                <a
                  type="button"
                  className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary text-gray-800 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400"
                >
                  Leave group
                </a>
              ) : (
                <a
                  type="button"
                  className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary text-gray-800 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400"
                >
                  Delete group
                </a>
              )}
            </div>
          </div>
        </div>
      );
    })
  );
}
