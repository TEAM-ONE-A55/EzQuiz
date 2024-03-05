import { BellIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { updateRoom } from "../../services/room.service";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../services/user.service";
import PropTypes from "prop-types";
import "./Notifications.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Notifications({ notifications, setNotifications }) {
  const { userData } = useContext(AppContext);

  const icon = Object.values(notifications).find((n) => n.length !== 0)
    ? "h-7 w-7 fill-white"
    : "h-7 w-7";

  const acceptInvitation = async (e) => {
    const id = e.target.parentNode.id;
    await updateRoom(id, "participants", userData.handle, "accepted");
    await updateUserData(userData.handle, `rooms/${id}`, id);
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      roomInvitations: prevNotifications.roomInvitations.filter(
        (invitation) => invitation.id !== id
      ),
    }));
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
        {notifications.roomInvitations.length !== 0 ? (
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {notifications.roomInvitations.map((n) => (
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
                        You were invited in {n.name} by {n.creator}
                        <br />
                        <span
                          className="material-symbols-outlined"
                          style={{ color: "#04D010" }}
                          onClick={(e) => {
                            acceptInvitation(e);
                          }}
                        >
                          task_alt
                        </span>{" "}
                        <span
                          className="material-symbols-outlined"
                          style={{ color: "#970C10" }}
                        >
                          cancel
                        </span>
                        {/* <hr/> */}
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
        )}
      </div>
    </Menu>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.object,
  setNotifications: PropTypes.func,
};
