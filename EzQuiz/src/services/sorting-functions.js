export const sortUsers = (users, sortBy) => {
    if(users) {
        switch (sortBy) {
            case "dateDescending":
                return users.sort((a, b) => b.createdOn - a.createdOn);
            case "dateAscending":
                return users.sort((a, b) => a.createdOn - b.createdOn);
            case "usernameDescending":
                return users.sort((a, b) => b.handle.localeCompare(a.handle));
            case "usernameAscending":
                return users.sort((a, b) => a.handle.localeCompare(b.handle));
            default:
                return users
          .slice()
          .sort(
            (a, b) =>
              (b ? new Date(b.createdOn) : 0) -
              (a ? new Date(a.createdOn) : 0)
          );
        }
    }
}