import React, { useState, useEffect } from 'react';
import './User.css'; // Importing CSS for styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchHistory(prevSearches => [searchTerm, ...prevSearches]);
      const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setUsers(filteredUsers);
    } else {
      setUsers(users); // Reset to original list if search term is empty
    }
  };

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="button">Search</button>
      </div>
      <div>
        <button onClick={handleSortByName} className="button">Sort by Name</button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="past-searches">
        <h3>Past Search Terms:</h3>
        <ul>
          {searchHistory.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
