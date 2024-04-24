import './App.css';
import { Route,BrowserRouter as Router,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import ManagerTable from './components/ManagerTable';
import Details from './components/Details';
import UpdateDetails from './components/UpdateDetails';
import UpdateForm from './components/UpdateForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Dashboard/>}></Route>
          <Route exact path='/loginpage' element={<LoginPage/>}></Route>
          <Route exact path='/userdashboard' element={<UserDashboard/>}></Route>
          <Route exact path='/managertable' element={<ManagerTable/>}></Route>
          <Route exact path='/details' element={<Details/>}></Route>
          <Route exact path='/updatedetails' element={<UpdateDetails/>}></Route>
          <Route exact path='updateform' element={<UpdateForm/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
