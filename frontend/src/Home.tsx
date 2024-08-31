import React from "react";
import {Link} from "react-router-dom";


const Home: React.FC  = () => {
    
    return (
        
                <div>
                    <h1>The Bath App</h1>
                    <h2>Baby Tracker App</h2>

                    <Link to="/login">
                         <button>Log In</button>
                     </Link>

                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
                </div>
           
    
        );
}

export default Home

