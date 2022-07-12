import React from "react";
import { users } from "./data";
import "./styles.css";
import _ from "lodash";

export default function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(users);

  const handleSearchFilter = (e) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = _.filter(users, (user) => {
        return _.includes(
          _.lowerCase(JSON.stringify(_.values(user))),
          _.lowerCase(searchValue)
        );
      });
      setFilteredUsers(filter);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <div className="App">
      <h1>Users</h1>

      <input
        type="search"
        placeholder="Search users..."
        value={searchValue}
        onChange={handleSearchFilter}
      />
      <ul className="user-list">
        {_.map(filteredUsers, (user) => (
          <li key={user.id}>
            <strong>
              {user.firstName} {user.lastName}
            </strong>
            <br />
            <small>{user.email}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
