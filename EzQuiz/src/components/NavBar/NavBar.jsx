import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  navigationEducator,
  navigationLogout,
  navigationParticipant,
  navigationAdmin,
} from "../../constants/constants";
import "./NavBar.css";
import Button from "../Button/Button";
import { getAllHubs } from "../../services/hub.service";
import Notifications from "../Notifications/Notifications";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const { userData, user, setContext } = useContext(AppContext);
  const [navigation, setNavigation] = useState([]);
  const [notifications, setNotifications] = useState({
    quizInvitations: [],
    roomInvitations: [],
    groupInvitations: [],
    feedback: [],
  });
  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      if (userData.role === "admin") {
        setNavigation(navigationAdmin);
      } else if (user && userData.role === "educator") {
        setNavigation(navigationEducator);
      } else {
        setNavigation(navigationParticipant);
      }
    } else {
      setNavigation(navigationLogout);
    }
    getAllHubs("rooms").then(setRooms);
    getAllHubs("groups").then(setGroups);
  }, [user, userData]);

  useEffect(() => {
    if (userData && rooms.length > 0) {
      const newRoomInvitations = rooms.reduce((acc, room) => {
        if (
          room.participants &&
          Object.keys(room.participants).includes(userData.handle) &&
          room.participants[userData.handle] === "pending" &&
          !notifications.roomInvitations.some(
            (invitation) => invitation.id === room.id
          )
        ) {
          return [...acc, room];
        }
        return acc;
      }, []);

      if (newRoomInvitations.length > 0) {
        setNotifications((prevNotifications) => ({
          ...prevNotifications,
          roomInvitations: [
            ...prevNotifications.roomInvitations,
            ...newRoomInvitations,
          ],
        }));
      }

      if (userData && groups.length > 0) {
        const newGroupInvitations = groups.reduce((acc, group) => {
          if (
            group.participants &&
            Object.keys(group.participants).includes(userData.handle) &&
            group.participants[userData.handle] === "pending" &&
            !notifications.groupInvitations.some(
              (invitation) => invitation.id === group.id
            )
          ) {
            return [...acc, group];
          }
          return acc;
        }, []);

        if (newGroupInvitations.length > 0) {
          setNotifications((prevNotifications) => ({
            ...prevNotifications,
            groupInvitations: [
              ...prevNotifications.groupInvitations,
              ...newGroupInvitations,
            ],
          }));
        }
      }
    }
  }, [userData, rooms, groups]);

  const handleNavigation = (href) => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === href,
    }));
    setNavigation(updatedNavigation);
  };

  const logout = () => {
    logoutUser();
    setContext({ user: null, userData: null });
    navigate("/");
    setNotifications({
      quizInvitations: [],
      roomInvitations: [],
      groupInvitations: [],
      feedback: [],
    });
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-15xl px-2 sm:px-6 lg:px-8 navigation-bar">
            <div className="relative flex h-30 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="EzQuiz"
                    alt="ezquiz-logo"
                    onClick={() => navigate("/dashboard")}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 font-custom"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              {user && userData ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Notifications
                    notifications={notifications}
                    setNotifications={setNotifications}
                  />

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full text-sm focus:outline-none">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-12 w-12 rounded-full"
                          src={userData.avatar}
                          alt={`${userData.handle}-avatar`}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={logout}
                            >
                              Sign out
                            </NavLink>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <Button onClick={() => navigate("/signin")}>Sign in</Button>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
