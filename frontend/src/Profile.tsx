import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const BACKEND_URL = "http://localhost:3000";

   useEffect(()=> {

        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');

            if(!token){
                navigate("/login");
                return;
            }

            try{
                const response = await axios.get(`${BACKEND_URL}/auth/profile`, {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                })

                setUser(response.data);

                
            } catch(error){
                console.error("error fetching profile", error);
                navigate("/login");
            }
        
        }

    fetchUserProfile();
   }, [navigate])
    

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>This is your profile</h1>
        </div>
    );
};

export default Profile;
