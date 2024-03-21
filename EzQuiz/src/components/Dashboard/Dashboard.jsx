import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import PropTypes from "prop-types";

export default function Dashboard({ children }) {
  const { user, userData } = useContext(AppContext);

  return (
    <div>
      <div className="flex">
        <div className="relative duration-200 flex flex-col bg-clip-border bg-neutral-900 text-neutral-100 w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5">
          {user && userData && userData.role !== "admin" ? (
            <div className="">
              <NavLink
                to="/my-quizzes"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
                >
                  <div className="grid place-items-center mr-4">
                    <span className="material-symbols-outlined">
                      note_stack
                    </span>
                  </div>
                  {userData.role === "educator" ? "My Quizzes" : "Pending Quizzes"}
                </div>
              </NavLink>
              {userData.role === "student" &&
              <NavLink
              to="/my-completed-quizzes"
              className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
            >
              <div
                role="button"
                tabIndex="0"
                className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
              >
                <div className="grid place-items-center mr-4">
                  <span className="material-symbols-outlined">
                    note_stack
                  </span>
                </div>
                Quiz Results
              </div>
            </NavLink>
              }
              <NavLink
                to="/my-rooms"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
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
                  className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
                >
                  <div
                    role="button"
                    tabIndex="0"
                    className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
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
                  className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
                >
                  <div
                    role="button"
                    tabIndex="0"
                    className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
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
            <div className="">
               <NavLink
                to="/all-users"
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
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
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
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
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
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
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
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
                className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-neutral-100"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="flex items-center w-[90%] p-3 rounded-md transition-all hover:bg-neutral-800 hover:text-white outline-none"
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
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node
};
