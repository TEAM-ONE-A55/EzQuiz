import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import PropTypes from "prop-types";

export default function Dashboard({ children }) {
  const { user, userData } = useContext(AppContext);

  return (
    <>
      <div className="flex">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-black text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <h5 className="block antialiased tracking-normal text-3xl leading-snug text-gray-300">
              Dashboard
            </h5>
          </div>
          {user && userData && userData.role !== "admin" ? (
            <div>
              <NavLink
                to="/my-quizzes"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-300"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                >
                  <div className="grid place-items-center mr-4">
                    <span className="material-symbols-outlined">
                      note_stack
                    </span>
                  </div>
                  My Quizzes
                </div>
              </NavLink>
              <NavLink
                to="/my-rooms"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-300"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                >
                  <div className="grid place-items-center mr-4">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  My Rooms
                </div>
              </NavLink>
              {user && userData && userData.role === "educator" && (
                <NavLink
                  to="/my-groups"
                  className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-300"
                >
                  <div
                    role="button"
                    tabIndex="0"
                    className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                  >
                    <div className="grid place-items-center mr-4">
                      <span className="material-symbols-outlined">group</span>
                    </div>
                    My Groups
                  </div>
                </NavLink>
                
              )}
              
                <NavLink
                  to="/scoreboard"
                  className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-300"
                >
                  <div
                    role="button"
                    tabIndex="0"
                    className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                  >
                    <div className="grid place-items-center mr-4">
                      <span className="material-symbols-outlined">
                        kid_star
                      </span>
                    </div>
                    Scoreboard
                  </div>
                </NavLink>
              
            </div>
          ) : (
            <div>
               <NavLink
                to="/all-users"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-300"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                >
                  <div className="grid place-items-center mr-4">
                    <span className="material-symbols-outlined">
                    manage_accounts
                    </span>
                  </div>
                  Users
                </div>
              </NavLink>
              <NavLink
                to="/all-quizzes"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-300"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                >
                  <div className="grid place-items-center mr-4">
                    <span className="material-symbols-outlined">
                      note_stack
                    </span>
                  </div>
                  Quizzes
                </div>
              </NavLink>
              <NavLink
                to="/all-groups"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-300"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                >
                  <div className="grid place-items-center mr-4">
                    <span className="material-symbols-outlined">
                      group
                    </span>
                  </div>
                  Groups
                </div>
              </NavLink>
              <NavLink
                to="/all-rooms"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-300"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                >
                  <div className="grid place-items-center mr-4">
                    <span className="material-symbols-outlined">
                      school
                    </span>
                  </div>
                  Rooms
                </div>
              </NavLink>
              <NavLink
                to="/scoreboard"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-300"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                >
                  <div className="grid place-items-center mr-4">
                    <span className="material-symbols-outlined">
                    kid_star
                    </span>
                  </div>
                  Scoreboard
                </div>
              </NavLink>
            </div>
          )}
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node
};
