import React, { useEffect, useState } from 'react';
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
                        <li><a href='/dashboard'> Home </a></li>
                        <li><a href='/my-journal'> My Journal </a></li>
                        <li><a href='/add-sched'> Add Sched </a></li>
                        <li><a href='/profile'> Profile </a></li>
                        <li><a href='/logout'> Logout </a></li>
                    </ul>
                </div>
      
        </nav>

    );
}

export default NavBar;



// import React, { useEffect, useState } from 'react';
// import "./Navbar.css"; 

// // Define the type for props
// interface NavBarProps {
//     isAuthenticated: boolean;
// }

// const NavBar: React.FC<NavBarProps> = ({ isAuthenticated }) => {

//     const [hasToken, setHasToken] = useState(false);

//     useEffect(() => {
//         const checkToken = () => {
//             const token = localStorage.getItem("token");
//             setHasToken(!!token); 
//         };

//         checkToken();

//         console.log('token in navbar', localStorage.getItem('token'));
//     }, []);

//     if (!hasToken) {
//         return null;
//     }

//     return (
//         <nav>
//             {isAuthenticated ? (
//                 <div>
//                     <ul>
//                         <li><a href='/dashboard'> Home </a></li>
//                         <li><a href='/my-journal'> My Journal </a></li>
//                         <li><a href='/add-sched'> Add Sched </a></li>
//                         <li><a href='/profile'> Profile </a></li>
//                         <li><a href='/logout'> Logout </a></li>
//                     </ul>
//                 </div>
//             ) : (
//                 <div></div>
//             )}
//         </nav>
//     );
// };

// export default NavBar;
