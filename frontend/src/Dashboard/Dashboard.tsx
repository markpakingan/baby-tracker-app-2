import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";
import "./Dashboard.css"


const Dashboard: React.FC  = () => {

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem('userId');

    const BACKEND_URL = "http://localhost:3000";
    const navigate = useNavigate();
    const [activities, setActivities] = useState<any[]>([]);
 
    // fetches the most recent activity of users
    useEffect(()=> {

        const fetchRecentActivity = async () => {


            try{
                const response = await axios.get(`${BACKEND_URL}/activities/recent`, {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                    params:{
                        id: userId
                    }
                })

                console.log(response)
                setActivities(response.data);
                
            } catch(error){
                console.error("error fetching profile", error);
                navigate("/login");
            }
        
        }

    fetchRecentActivity();
   }, [navigate, token, userId])




//    checks if the user already has an existing baby
   useEffect(()=>{

    const checkIfBabyExist = async()=> {

        try{
            const response = await axios.get(`${BACKEND_URL}/baby/user/${userId}`)
            
            if(!response.data){
                alert("No baby found!")
                navigate('/add-baby')
               }
 
        }catch(error){
            console.error("error baby found", error)
        }
    }

    checkIfBabyExist();
   }, [navigate, token,userId]);

    
    return (
            
        <div>
            <h1 className="welcome-back">Welcome Back {username}!</h1>
            <h2 className="recent-activities">Recent Activities:</h2>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index + 1}>
                        <ul>
                            <li>{activity.type}: </li>
                            <li>{new Date(activity.date).toLocaleString()}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
        
        )
}

export default Dashboard



// testing