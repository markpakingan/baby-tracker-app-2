import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"; 


const NavBar: React.FC = () => {

    const [hasToken, setHasToken] = useState(false);


    useEffect(()=>{

        const checkToken = () => {
            const token = localStorage.getItem("token");
            setHasToken(!!token); 
        }

        checkToken();
    }, [])

    if (!hasToken) {
        return null;
    }


    return (

        <nav>

           
                <div>

                    <ul>
                        <li><Link to='/dashboard'></Link> Home</li>
                        <li><Link to='/my-journal'> My Journal </Link></li>
                        <li><Link to='/add-sched'> Add Sched </Link></li>
                        <li><Link to='/profile'> Profile </Link></li>
                        <li><Link to='/logout'> Logout </Link></li>
                    </ul>
                </div>
      
        </nav>

    );
}

export default NavBar;

