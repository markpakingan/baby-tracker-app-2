import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";


const Logout: React.FC  = () => {

    const navigate = useNavigate();
    const [hasLoggedOut, setHasLoggedOut] = useState(false)
    

    useEffect(()=>{

        if (!hasLoggedOut){

            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            localStorage.removeItem("babyId");
            
            setHasLoggedOut(true);

            navigate("/")
            
            setTimeout(() => {
                alert("You have been logged out!");
            }, 0);
    
        }


    }, [navigate, hasLoggedOut])


    return (
        <div>
        </div>
        )
}

export default Logout