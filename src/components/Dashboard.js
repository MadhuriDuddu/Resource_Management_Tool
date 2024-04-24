import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/loginpage')
    }

    return (
        <div className='container'>
            <h1 className='text-center'>Welcome to Resource Management Tool</h1>
            <div className="text-center mt-4"> {/* Adding mt-4 for margin top */}
                <button className='loginbtndashboard btn btn-primary' onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}

export default Dashboard





