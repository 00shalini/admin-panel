import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import usermgnt from "../assets/images/User-Mngmt.png";
import "../App.css";

function AdminPanel() {
  const [apiKey, setApiKey] = useState("");
  const [frequency, setFrequency] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/keys").then((response) => {
      setApiKey(response.data.apiKey);
    });
    axios.get("http://localhost:5000/api/frequency").then((response) => {
      setFrequency(response.data.frequency);
    });
    axios.get("http://localhost:5000/api/users").then((response) => {
      setUsers(response.data.users);
    });
  }, []);

  const updateApiKey = (event) => {
    event.preventDefault();
    axios.put("http://localhost:5000/api/keys", { apiKey }).then((response) => {
      alert(response.data.message);
    });
  };

  const updateFrequency = (event) => {
    event.preventDefault();
    console.log(frequency);
    axios
      .put("http://localhost:5000/api/frequency", { frequency: frequency })
      .then((response) => {
        alert(response.data.message);
      });
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5000/api/users/${id}`).then((response) => {
        alert(response.data.message);
        setUsers(users.filter((user) => user._id !== id));
      });
    }
  };

  const blockUser = (id) => {
    if (window.confirm("Are you sure you want to block this user?")) {
      axios
        .put(`http://localhost:5000/api/users/${id}/block`)
        .then((response) => {
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
    if (window.confirm("Are you sure you want to unblock this user?")) {
      axios
        .put(`http://localhost:5000/api/users/${id}/unblock`)
        .then((response) => {
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
      <nav style={{ backgroundColor: "rgb(33, 37, 33)", height: "120px", marginBottom:'50px' }}>
        <div>
          <div>
            <img
              src={usermgnt}
              alt="Logo"
              width="100"
              height="100"
              style={{ marginLeft: "20px", marginTop: "15px" }}
              class="d-inline-block"
            />
          </div>
          <p
            style={{
              marginLeft: "660px",
              marginTop: "-70px",
              fontSize: "30px",
              fontWeight: 400,
              fontFamily: "fantasy",
              color: "white",
            }}
          >
            User Management
          </p>
        </div>
      </nav>
      <div style={{display:'flex',width:'90%', justifyContent:'space-around', backgroundColor:'rgb(54, 6, 54)', height:'150px',margin:'auto', borderRadius:'20px', padding:'3.5%', border:' 1.5px solid rgb(28, 19, 204)'}}>
      
      <form onSubmit={updateApiKey}>
        <label style={{fontFamily:'serif', letterSpacing:'1px', fontWeight:600, paddingRight:'20px', color:'white', fontSize:'20px'}}>
          OpenWeather API key
          <input
            type="text"
            value={apiKey}
            style={{marginLeft:'10px', width:'250px', borderRadius:'10px', height:'40px',border:'none'}}
            onChange={(event) => setApiKey(event.target.value)}
          />
        </label>
        <button
                  type="submit"
                  class="btn"
                 style={{border:'2px solid white', color:'white', backgroundColor:"rgb(54, 6, 54)", width:'120px'}}
                >
                  Update
                </button>
                
      </form>

      <form onSubmit={updateFrequency}>
        <label style={{fontFamily:'serif', letterSpacing:'1px', fontWeight:600, paddingRight:'20px', color:'white',  fontSize:'20px'}}>
          Frequency
          <input
          style={{marginLeft:'10px', width:'250px', borderRadius:'10px', height:'40px',border:'none'}}
            type="number"
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
          />
        </label>
        <button type="submit"  style={{border:'2px solid white', color:'white', backgroundColor:"rgb(54, 6, 54)", width:'120px'}} class="btn">
          Update
        </button>
      </form>
      </div>
      <table class="table table-striped" style={{width:"40%", margin:'auto', marginTop:'50px', border:'2px solid black', textAlign:'center'}}>
        <thead>
          <tr>
            <th scope="col" >Name</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td scope="row">{user.name}</td>
              <td>{user.city}</td>
              <td>{user.country}</td>
              <td>
                {!user.blocked && (
                  <button onClick={() => blockUser(user._id)} class="btn" style={{border:'2px solid white', color:'white', backgroundColor:"rgb(54, 6, 54)", width:'120px'}}>Block</button>
                )}
                {user.blocked && (
                  <button onClick={() => unblockUser(user._id)} class="btn" style={{border:'2px solid white', color:'white', backgroundColor:"rgb(54, 6, 54)", width:'120px'}}>Unblock</button>
                )}
                <button onClick={() => deleteUser(user._id)} class="btn" style={{border:'2px solid white', color:'white', backgroundColor:"rgb(54, 6, 54)", width:'120px'}}>Delete</button>
              </td>
              <td>
               
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
