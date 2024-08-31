import React, { useEffect, useState } from 'react';

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
            <ul>
                <li><a href='/dashboard'> Home </a></li>
                <li><a href='/my-journal'> My Journal </a></li>
                <li><a href='/add-sched'> Add Sched </a></li>
                <li><a href='/profile'> Profile </a></li>
                <li><a href='/logout'> Logout </a></li>
            </ul>
        </nav>
    );
}

export default NavBar;
