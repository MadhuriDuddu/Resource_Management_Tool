// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

// const LoginUser = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const hanldeLogin = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email: credentials.email, password: credentials.password })
//     });
//     const json = await response.json();
//     console.log(json);
//     if (json.success) {
//       // Save the auth token and redirect
//       localStorage.setItem('token', json.authtoken);
//       localStorage.setItem('userEmail', credentials.email);
      
//       // Decode JWT token to get user's role
//       const decodedToken = jwtDecode(json.authtoken);
//       const userRole = decodedToken.user.role;

//       // Redirect based on user's role
//       if (userRole === 'Resource') {
//         navigate('/userdashboard');
//       } else if (userRole === 'Manager') {
//         navigate('/managertable');
//       }
//     } else {
//       alert("Invalid Credentials");
//     }
//   }

//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   }

//   return (
//     <div className='container my-3'>
//       <div className='card shadow' style={{ maxWidth: '400px', margin: '0 auto' }}>
//         <h1 className='card-header text-center text-black'>Login Form</h1>
//         <div className='card-body'>
//           <form onSubmit={hanldeLogin}>
//             <div className="mb-3">
//               <input type="email" className="form-control" value={credentials.email} name='email' onChange={onChange} placeholder="Email" required />
//             </div>
//             <div className="mb-3">
//               <input type="password" className="form-control" value={credentials.password} name="password" onChange={onChange} placeholder="Password" required />
//             </div>
//             <div className="d-flex justify-content-center my-3">
//               <button className="loginbtndashboard btn btn-primary" type="submit">Login</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LoginUser;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginUser = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const hanldeLogin = async (e) => {
    e.preventDefault();

    // Basic password requirements
    if (!validatePassword(credentials.password)) {
      alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      localStorage.setItem('userEmail', credentials.email);
      
      // Decode JWT token to get user's role
      const decodedToken = jwtDecode(json.authtoken);
      const userRole = decodedToken.user.role;

      // Redirect based on user's role
      if (userRole === 'Resource') {
        navigate('/userdashboard');
      } else if (userRole === 'Manager') {
        navigate('/managertable');
      }
    } else {
      alert("Invalid Credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  // Function to validate password
  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  return (
    <div className='container my-3'>
      <div className='card shadow' style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 className='card-header text-center text-black'>Login Form</h1>
        <div className='card-body'>
          <form onSubmit={hanldeLogin}>
            <div className="mb-3">
              <input type="email" className="form-control" value={credentials.email} name='email' onChange={onChange} placeholder="Email" required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" value={credentials.password} name="password" onChange={onChange} placeholder="Password" required />
            </div>
            <div className="d-flex justify-content-center my-3">
              <button className="loginbtndashboard btn btn-primary" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginUser;
