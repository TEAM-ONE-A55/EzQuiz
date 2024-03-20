import { useContext } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../../../context/AppContext";
import Loader from "../../../../components/Loader/Loader";
import PropTypes from "prop-types"

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
    <div 
      key={group.id} 
      className="bg-neutral-50 w-64 rounded-xl flex-col min-h-[450px] max-h-[600px] relative shadow-neutral-500 shadow-xl"
    >
      <div className="block rounded-lg text-surface">
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img className="w-64 h-36 object-cover border-none rounded-t-xl" src={group.image_cover} alt="" />
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
            {group.name}
          </h5>
          <p className="mb-4 text-base text-gray-700">{group.description}</p>
          <p className="text-base text-surface/75 dark:text-neutral-600">
            <small>Created by: {group.creator}</small>
          </p>
          <div className="absolute bottom-6 left-[50%] translate-x-[-50%] flex mt-[25%] justify-center items-center gap-2">
            <button
              className="w-[80px] block rounded-lg bg-yellow-400 pt-1.5 pb-1 text-sm font-medium cursor-pointer uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-75 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800"
              onClick={() => navigate(`/my-groups/${group.id}`)}
            >
              Enter
            </button>
            {userData.handle !== group.creator && userData.handle !== 'admin' ? (
              <button
                className="w-[80px] block rounded-lg bg-yellow-400 pt-1.5 pb-1 text-sm font-medium cursor-pointer uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-75 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800"
                onClick={() => leaveGroup(group.id)}
              >
                Leave
              </button>
            ) : (
              <button
                className="w-[80px] block rounded-lg bg-yellow-400 pt-1.5 pb-1 text-sm font-medium cursor-pointer uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-75 ease-in-out hover:bg-yellow-500 hover:shadow-neutral-800"
                onClick={() => deleteGroup(group.id, group.uuid, group.image_cover)}
              >
                Delete
              </button>
            )}
          </div>
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
