// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const UserDashboard = () => {
//     const navigate = useNavigate();
//     const handleUpdate = () => {
//         navigate('/updatedetails');
//     };
//     const handleForm = () => {
//         navigate('/details');
//     };

//     const [hasFormData, setHasFormData] = useState(false);

//     useEffect(() => {
//         // Check if form data exists for the logged-in user
//         const checkFormData = async () => {
//             try {
//                 const userEmail = localStorage.getItem('userEmail');
//                 const response = await fetch(`http://localhost:5000/api/formdata/check/${userEmail}`);
//                 const data = await response.json();
//                 setHasFormData(data.exists);
//             } catch (error) {
//                 console.error('Error checking form data:', error);
//             }
//         };

//         checkFormData();
//     }, []);

//     return (
//         <div className="container my-4">
//             <h1 className="text-center">Welcome to User Dashboard</h1>
//             <div className="buttons-container d-flex justify-content-center">
//                 {!hasFormData ? (
//                     <button className="formbtn" onClick={handleForm}>Fill Form</button>
//                 ) : (
//                     <button className="disabled-formbtn" disabled>Fill Form</button>
//                 )}
//                 {hasFormData ? (
//                     <button className="updatebtn" onClick={handleUpdate}>Update Details</button>
//                 ) : (
//                     <button className="disabled-updatebtn" disabled>Update Details</button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserDashboard;



import '../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
 
const UserDashboard = () => {
    const navigate = useNavigate();
    const handleUpdate = () => {
        navigate('/updatedetails');
    };
    const handleForm = () => {
        navigate('/details');
    };
 
    const [userData, setUserData] = useState(null); // State to store user data
    const [hasFormData, setHasFormData] = useState(false);
   
 
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                const userDataResponse = await fetch(`http://localhost:5000/api/user/${userEmail}`);
                const userData = await userDataResponse.json();
                setUserData(userData);
                const formDataResponse = await fetch(`http://localhost:5000/api/formdata/check/${userEmail}`);
                const formData = await formDataResponse.json();
                setHasFormData(formData.exists);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
 
        fetchData();
    }, []);
 
    return (
        <div className="container my-4">
            <h1 className='text-center'>Welcome to User Dashboard</h1>
            <div className="d-flex justify-content-center my-3">
                {userData ? (
                    <div className="card">
                        <div className="card-body">
                            {!hasFormData ? (
                                <>
                                    <p className="card-text">Email:{localStorage.getItem('userEmail')}</p>
                                    <p className="card-text text-muted">You haven't filled the form yet.</p>
                                </>
                            ) : (
                                <>
                                    <p className="card-text">First Name: {userData.firstName}</p>
                                    <p className="card-text">Last Name: {userData.lastName}</p>
                                    <p className="card-text">Email:{userData.email}</p>
 
                                </>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="d-flex justify-content-center my-3">
                {/* Render buttons */}
                {!hasFormData ? (
                    <button className="formbtn mx-2" type="submit" onClick={handleForm}>Form</button>
                ) : (
                    <button className="disabled-formbtn" disabled>Form</button>
                )}
                {hasFormData ? (
                    <button className="updatebtn mx-2" type="submit" onClick={handleUpdate}>Update Details</button>
                ) : (
                    <button className="disabled-updatebtn" disabled>Update Details</button>
                )}
            </div>
        </div>
    );
};
 
export default UserDashboard;