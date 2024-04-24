import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const UpdateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    experience: '',
    technology: '',
    status: '',
    projectName: '',
    reportingTo: '',
    reportingManagerEmail: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user's form data and set the initial state
    const fetchFormData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const response = await fetch(`http://localhost:5000/api/formdata/user/${userEmail}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`http://localhost:5000/api/formdata/update/${userEmail}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form data updated successfully');
        navigate('/updatedetails');
      } else {
        console.error('Failed to update form data');
      }
    } catch (error) {
      console.error('Error updating form data:', error);
    }
  };

  const handleBackbtn = () => {
    navigate('/userdashboard')
  }

  return (
    <div className="container">
      <h2 className='text-center mt-5 mb-4'>Update Your Details</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} readOnly />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} readOnly />
        </div>
        <div className="col-12">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} readOnly />
        </div>
        <div className="col-md-4">
          <label htmlFor="experience" className="form-label">Experience</label>
          <input type="text" className="form-control" id="experience" name="experience" value={formData.experience} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="technology" className="form-label">Technology</label>
          <input type="text" className="form-control" id="technology" name="technology" value={formData.technology} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="status" className="form-label">Status</label>
          <input type="text" className="form-control" id="status" name="status" value={formData.status} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="projectName" className="form-label">Project Name</label>
          <input type="text" className="form-control" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="reportingTo" className="form-label">Reporting To</label>
          <input type="text" className="form-control" id="reportingTo" name="reportingTo" value={formData.reportingTo} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label htmlFor="reportingManagerEmail" className="form-label">Reporting Manager Email</label>
          <input type="email" className="form-control" id="reportingManagerEmail" name="reportingManagerEmail" value={formData.reportingManagerEmail} onChange={handleChange} />
        </div>

        <div className="col-12 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary me-2">Update</button>
          <button className='btn btn-secondary' onClick={handleBackbtn}>Back to Dashboard</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
