import { useState } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const handleLogin = (event) => {
    event.preventDefault()
    if ( email && password){
        axios.post('http://localhost:5000/api/login', { email, password }).then((res) => {
            if (res.data.message == true) {
                setIsAuth(true);
                props.callback(true)
            } else {
                alert('enter valid email and password')
            }
        });
    } else {
      alert("enter valid email and password")
    }
 
  }

  return (
    <form style={{width:'50%', margin:'auto', border:'2px solid lightgrey', padding:'20px', marginTop:'50px' }}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmailChange} value={email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={handlePasswordChange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
</form>
  );
}

export default Login;
