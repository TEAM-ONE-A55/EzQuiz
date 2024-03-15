import Select from "react-select";
import PropTypes from "prop-types";

export default function DropdownSelectUsers({
  users,
  selectedUsers,
  setSelectedUsers,
}) {
  const handleSelectedOptionsUsers = (selected) => {
    setSelectedUsers(selected);
  };

  return (
    <Select
      isMulti
      name="users"
      options={users.map((user) => user)}
      className="basic-multi-select"
      classNamePrefix="select"
      value={selectedUsers}
      onChange={handleSelectedOptionsUsers}
    />
  );
}

DropdownSelectUsers.propTypes = {
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func,
};
