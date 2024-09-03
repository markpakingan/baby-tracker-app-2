import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const MyJournal: React.FC  = () => {


    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem('userId');

    const BACKEND_URL = "http://localhost:3000";
    const navigate = useNavigate();
    const [activities, setActivities] = useState<any[]>([]);

 
    // fetches the most recent activity of users
    useEffect(()=> {

        const fetchTopTenActivities = async () => {


            try{
                const response = await axios.get(`${BACKEND_URL}/activities/daily`, {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                    params:{
                        id: userId
                    }
                })

                console.log(response)
                setActivities(response.data)

                
            } catch(error){
                console.error("error fetching profile", error);
                navigate("/login");
            }
        
        }

    fetchTopTenActivities();
   }, [navigate, token, userId])


    return (
        <div>
            <h1>Here Are All Of What You've Done:</h1>

            <ul>
                {activities.map((activity, index)=> (
                    <li key = {index + 1}>
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

    export default MyJournal