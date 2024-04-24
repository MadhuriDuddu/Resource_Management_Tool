import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication token and redirect to login page
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('managerEmail');
    navigate('/');
  };

  // Function to determine if the logout button should be visible
  const shouldShowLogoutButton = () => {
    const authenticated = localStorage.getItem('token');
    const { pathname } = location;

    // Show logout button only on UserDashboard, UpdateDetails, and ManagerTable pages if user is authenticated
    return authenticated && (pathname.includes('/userdashboard') || pathname.includes('/updatedetails') || pathname.includes('/managertable'));
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, #2d2d8e, white)' }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img src="https://www.evoketechnologies.com/wp-content/uploads/2022/08/cropped-cropped-Evoke_logo_for-web-01-01.png" alt="Evoke Technologies Logo" className="evoke-logo mr-auto" />
        </div>
        <button 
          className="logout-btn" 
          onClick={handleLogout} 
          style={{
            backgroundColor: '#dc3545', // Red color for the button
            color: 'white', // White text color
            border: 'none', // No border
            padding: '8px 16px', // Padding for the button
            borderRadius: '4px', // Rounded corners
            cursor: 'pointer', // Cursor on hover
            transition: 'background-color 0.3s ease', // Smooth transition for hover effect
          }}
          // Hover effect: change background color on hover
          onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'} // Darker shade of red on hover
          onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'} // Revert to original color on mouse leave
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
