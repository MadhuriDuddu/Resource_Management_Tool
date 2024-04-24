// Code with changes with authentication for user 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve user's email from local storage
    const userEmail = localStorage.getItem('userEmail');

    // Validate user's email
    if (formData.email !== userEmail) {
      alert('Invalid user email');
      return;
    }

    // Proceed with form submission
    try {
      // If status is 'Practice', set project name as '-'
      const projectName = formData.status === 'Practice' ? 'N/A' : formData.projectName;

      const response = await fetch('http://localhost:5000/api/formData/submitFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, projectName }) // Include projectName in the request body
      });

      if (response.ok) {
        console.log('Form data submitted successfully');
        // Clear form fields after successful submission
        setFormData({
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
        navigate('/updatedetails');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center mb-4">Candidate Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
        </div>
        <div className="col-md-12 my-2">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="col-md-12 my-2">
          <label htmlFor="experience" className="form-label">Experience</label>
          <input type="text" className="form-control" id="experience" name="experience" value={formData.experience} onChange={handleChange} />
        </div>
        <div className="col-md-12 my-2">
          <label htmlFor="technology" className="form-label">Technology</label>
          <input type="text" className="form-control" id="technology" name="technology" value={formData.technology} onChange={handleChange} />
        </div>
        <div className="col-md-12 my-2">
          <label>Status</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Project" id="projectRadio" checked={formData.status === 'Project'} onChange={handleChange} name="status" />
            <label className="form-check-label" htmlFor="projectRadio">
              Project
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Practice" id="practiceRadio" checked={formData.status === 'Practice'} onChange={handleChange} name="status" />
            <label className="form-check-label" htmlFor="practiceRadio">
              Practice
            </label>
          </div>
        </div>
        {/* Conditional rendering for project name field */}
        {formData.status === 'Project' && (
          <div className="col-md-12 my-2">
            <label htmlFor="projectName" className="form-label">Project Name</label>
            <input type="text" className="form-control" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} />
          </div>
        )}
        <div className="col-md-12 my-2">
          <label htmlFor="reportingTo" className="form-label">Reporting To</label>
          <input type="text" className="form-control" id="reportingTo" name="reportingTo" value={formData.reportingTo} onChange={handleChange} />
        </div>
        <div className="col-md-12 my-2">
          <label htmlFor="reportingManagerEmail" className="form-label">Reporting Manager Email</label>
          <input type="email" className="form-control" id="reportingManagerEmail" name="reportingManagerEmail" value={formData.reportingManagerEmail} onChange={handleChange} />
        </div>
        <div className="d-flex justify-content-center my-3">
          <button className="submitdetails btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Details;




