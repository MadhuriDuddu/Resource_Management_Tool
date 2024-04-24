import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const UpdateDetails = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data based on the logged-in user's email
        const fetchUserData = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                const response = await fetch(`http://localhost:5000/api/formdata/user/${userEmail}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleClick = () => {
        navigate('/updateform', { state: userData }); // Pass user data as state to the UpdateForm component
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">User Details</h1>
            {userData && (
                <div className="card small-card shadow"> {/* Added shadow class */}
                    <div className="card-body">
                        <div className="user-details">
                            <div className="detail">
                                <span className="label">First Name:</span> {userData.firstName}
                            </div>
                            <div className="detail">
                                <span className="label">Last Name:</span> {userData.lastName}
                            </div>
                            <div className="detail">
                                <span className="label">Email:</span> {userData.email}
                            </div>
                            <div className="detail">
                                <span className="label">Experience:</span> {userData.experience}
                            </div>
                            <div className="detail">
                                <span className="label">Technology:</span> {userData.technology}
                            </div>
                            <div className="detail">
                                <span className="label">Status:</span> {userData.status}
                            </div>
                            <div className="detail">
                                <span className="label">Project Name:</span> {userData.projectName}
                            </div>
                            <div className="detail">
                                <span className="label">Reporting To:</span> {userData.reportingTo}
                            </div>
                            <div className="detail">
                                <span className="label">Reporting Manager Email:</span> {userData.reportingManagerEmail}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="d-flex justify-content-center my-3">
                <button className="update-btn" onClick={handleClick}>Update Details</button>
            </div>
        </div>
    );
};

export default UpdateDetails;
