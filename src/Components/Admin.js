import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [apiKey, setApiKey] = useState('');
  const [frequency, setFrequency] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/keys').then((response) => {
      setApiKey(response.data.apiKey);
    });
    axios.get('http://localhost:5000/api/frequency').then((response) => {
      setFrequency(response.data.frequency);
    });
    axios.get('http://localhost:5000/api/users').then((response) => {
      setUsers(response.data.users);
    });
  }, []);

  const updateApiKey = (event) => {
    event.preventDefault();
    axios.put('http://localhost:5000/api/keys', { apiKey }).then((response) => {
      alert(response.data.message);
    });
  };

  const updateFrequency = (event) => {
    event.preventDefault();
    console.log(frequency);
    axios.put('http://localhost:5000/api/frequency', { "frequency": frequency }).then((response) => {
    alert(response.data.message);
    });
    };
    
    const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
    axios.delete(`http://localhost:5000/api/users/${id}`).then((response) => {
    alert(response.data.message);
    setUsers(users.filter((user) => user._id !== id));
    });
    }
    };
    
    const blockUser = (id) => {
    if (window.confirm('Are you sure you want to block this user?')) {
    axios.put(`http://localhost:5000/api/users/${id}/block`).then((response) => {
    alert(response.data.message);
    setUsers(
    users.map((user) =>
    user._id === id ? { ...user, blocked: true } : user
    )
    );
    });
    }
    };
    
    const unblockUser = (id) => {
    if (window.confirm('Are you sure you want to unblock this user?')) {
    axios.put(`http://localhost:5000/api/users/${id}/unblock`).then((response) => {
    alert(response.data.message);
    setUsers(
    users.map((user) =>
    user._id === id ? { ...user, blocked: false } : user
    )
    );
    });
    }
    };
    
    return (
    <div>
    <h2>API Keys</h2>
    <form onSubmit={updateApiKey}>
    <label>
    OpenWeatherMap API key:
    <input
    type="text"
    value={apiKey}
    onChange={(event) => setApiKey(event.target.value)}
    />
    </label>
    <button type="submit">Update</button>
    </form>
    <h2>Message Frequency</h2>
  <form onSubmit={updateFrequency}>
    <label>
      Frequency (in minutes):
      <input
        type="number"
        value={frequency}
        onChange={(event) => setFrequency(event.target.value)}
      />
    </label>
    <button type="submit" onClick={updateFrequency}>Update</button>
  </form>

  <h2>User Management</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>City</th>
        <th>Country</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.city}</td>
          <td>{user.country}</td>
          <td>
            {!user.blocked && (
              <button onClick={() => blockUser(user._id)}>Block</button>
            )}
            {user.blocked && (
              <button onClick={() => unblockUser(user._id)}>Unblock</button>
            )}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
}
    
export default AdminPanel;