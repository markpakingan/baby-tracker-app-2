import React from "react";
import {Link} from "react-router-dom";
import './Home.css';



const Home: React.FC  = () => {
    
    return (
        
                <div>
                    <h1 className="website-title">The Bath App</h1>

                    <div className="logo"></div>
                    <h2>Baby Tracker App</h2>

                    <Link to="/login">
                         <button className="home-button">Log In</button>
                     </Link>

                    <Link to="/signup">
                        <button className="home-button">Sign Up</button>
                    </Link>
                </div>
           
    
        );
}

export default Home

