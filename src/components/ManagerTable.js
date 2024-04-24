import React, { useState, useEffect } from 'react';
import '../App.css'
 
const ManagerTable = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetchFormData();
  }, []);
 
  const fetchFormData = async () => {
    try {
      const managerEmail = localStorage.getItem('userEmail');
      const response = await fetch(`http://localhost:5000/api/formData/allFormData?email=${managerEmail}`);
      if (response.ok) {
        const data = await response.json();
        setFormDataList(data);
        console.log(data)
      } else {
        throw new Error('Failed to fetch form data');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching form data:', error);
    }
  };
 
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/formData/deleteFormData/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted resource from the state
        setFormDataList(formDataList.filter((formData) => formData._id !== id));
        // Show alert for successful deletion
        alert('Form data deleted successfully!');
      } else {
        throw new Error('Failed to delete form data');
      }
    } catch (error) {
      console.error('Error deleting form data:', error);
    }
  };
 
  return (
    <div className="managertable">
      <h2 className="text-center mb-4">Manager Dashboard</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Technology</th>
              <th>Status</th>
              <th>Project Name</th>
              <th>Reporting To</th>
              <th>Reporting Manager Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {formDataList.map((formData) => (
              <tr key={formData._id}>
                <td>{formData.firstName}</td>
                <td>{formData.lastName}</td>
                <td>{formData.email}</td>
                <td>{formData.experience}</td>
                <td>{formData.technology}</td>
                <td>{formData.status}</td>
                <td>{formData.status === 'Practice' ? 'N/A' : formData.projectName}</td>
                <td>{formData.reportingTo}</td>
                <td>{formData.reportingManagerEmail}</td>
                <td>
                  <button onClick={() => handleDelete(formData._id)} className="deletebtn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
 
export default ManagerTable;