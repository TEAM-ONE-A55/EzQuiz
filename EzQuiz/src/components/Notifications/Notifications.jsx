import { BellIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { updateHub } from "../../services/hub.service";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import PropTypes from "prop-types";
import "./Notifications.css";
import toast from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Notifications({ notifications, setNotifications }) {
  const { userData } = useContext(AppContext);

  const icon = Object.values(notifications).find((n) => n.length !== 0)
    ? "h-7 w-7 fill-white"
    : "h-7 w-7";

  const acceptInvitation = async (id, name) => {
    const hubType = userData.role === "student" ? "rooms" : "groups";
    const updateType =
      userData.role === "student" ? "roomInvitations" : "groupInvitations";
    const updateAction = "accepted";

    await updateHub(hubType, id, "participants", userData.handle, updateAction);
    await updateUserData(userData.handle, `${hubType}/${id}`, id);

    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [updateType]: prevNotifications[updateType].filter(
        (invitation) => invitation.id !== id
      ),
    }));

    if (hubType === "rooms") {
      toast.success(`You've joined the room ${name} successfully!`);
    } else {
      toast.success(`You're now collaborating in group ${name}!`);
    }
  };

  const declineInvitation = async (id, name) => {
    const hubType = userData.role === "student" ? "rooms" : "groups";
    const updateType =
      userData.role === "student" ? "roomInvitations" : "groupInvitations";
    const updateAction = "declined";

    await updateHub(hubType, id, "participants", userData.handle, updateAction);

    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [updateType]: prevNotifications[updateType].filter(
        (invitation) => invitation.id !== id
      ),
    }));

    if (hubType === "rooms") {
      toast.success(`You've declined the invitation to room ${name}.`);
    } else {
      toast.success(`You won't be collaborating in group ${name}.`);
    }
    
  };

  const renderNotifications = () => {
    const invitations =
      userData.role === "student"
        ? notifications.roomInvitations
        : notifications.groupInvitations;
    const role = userData.role === "student" ? "student" : "educator";

    return invitations.length !== 0 ? (
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {invitations.map((n) => (
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            key={n.id}
          >
            <Menu.Item>
              {({ active }) => (
                <div>
                  <a
                    id={n.id}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    You have been invited to{" "}
                    {role === "educator" ? "collaborate in" : "join"} {n.name}{" "}
                    by {n.creator}
                    <br />
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "#04D010" }}
                      onClick={() => acceptInvitation(n.id, n.name)}
                    >
                      task_alt
                    </span>{" "}
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "#970C10" }}
                      onClick={() => declineInvitation(n.id, n.name)}
                    >
                      cancel
                    </span>
                  </a>
                  <hr />
                </div>
              )}
            </Menu.Item>
          </Transition>
        ))}
      </Menu.Items>
    ) : (
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700"
              )}
            >
              No notifications to display right now
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    );
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button
          type="button"
          className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon className={icon} aria-hidden="true" />
        </Menu.Button>

        {renderNotifications()}
      </div>
    </Menu>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.object,
  setNotifications: PropTypes.func,
};
