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


   //creates category for each activity
   const groupedActivities = activities.reduce((acc, activity) => {
    const {type} = activity;

    if(!acc[type]){
        acc[type] = [];
    }

    acc[type].push(activity);
    return acc;
   }, {} as Record<string, any[]>);


   return (
    <div>
      <h2>Check Out Your Activities:</h2>

      {Object.keys(groupedActivities).map((type) => (
        <div key={type}>
          <h3 className="activities">{type}</h3>
          <ul>
            {groupedActivities[type].map((activity: any, index: any) => (
              <li key={index}>
                {new Date(activity.date).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ))}

    <a href="/add-sched">Ready to Add Sched? Click Here</a>

    </div>
  );
}

    export default MyJournal


// testing