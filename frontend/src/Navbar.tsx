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


// import React, { useEffect, useState } from 'react';

// interface NavBarProps {
//   isAuthenticated: boolean;
// }

// const NavBar: React.FC<NavBarProps> = ({ isAuthenticated }) => {
//     const [hasToken, setHasToken] = useState(false);

//     useEffect(() => {
//         const checkToken = () => {
//             const token = localStorage.getItem("token");
//             setHasToken(!!token); 
//         };

//         checkToken();

//         const handleStorageChange = () => {
//             checkToken();
//         };

//         window.addEventListener("storage", handleStorageChange);

//         return () => {
//             window.removeEventListener("storage", handleStorageChange);
//         };
//     }, []);

//     // Use isAuthenticated prop to determine whether to display the NavBar
//     if (!isAuthenticated && !hasToken) {
//         return null;
//     }

//     return (
//         <nav>
//             <ul>
//                 <li><a href='/dashboard'> Home </a></li>
//                 <li><a href='/my-journal'> My Journal </a></li>
//                 <li><a href='/add-sched'> Add Sched </a></li>
//                 <li><a href='/profile'> Profile </a></li>
//                 <li><a href='/logout'> Logout </a></li>
//             </ul>
//         </nav>
//     );
// }

// export default NavBar;
