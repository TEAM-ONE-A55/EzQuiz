import { useContext } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../../context/AppContext";
import Loader from "../../../components/Loader/Loader";
import PropTypes from "prop-types"
import "./GroupSimpleView.css";

export default function GroupSimpleView({
  group,
  hasGroups,
  loading,
  leaveGroup,
  deleteGroup,
}) {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  if (loading && !hasGroups) {
    return <Loader />;
  }

  if (!hasGroups && !loading) {
    return null;
  }

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
          <p className="mb-4 text-base text-gray-700">{group.description}</p>
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
              onClick={() => leaveGroup(group.id)}
            >
              Leave group
            </a>
          ) : (
            <a
              type="button"
              className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary text-gray-800 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400"
              onClick={() => deleteGroup(group.id, group.uuid, group.image_cover)}
            >
              Delete group
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

GroupSimpleView.propTypes = {
  group: PropTypes.object,
  hasGroups: PropTypes.bool,
  loading: PropTypes.bool,
  leaveGroup: PropTypes.func,
  deleteGroup: PropTypes.func
};
