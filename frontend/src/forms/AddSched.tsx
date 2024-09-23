import React, { useEffect } from "react";
import axios from "axios";
import "./AddSched.css";


const AddSched: React.FC = () => {

    const BACKEND_URL = "http://localhost:3000";
    const userId = localStorage.getItem("userId")


      //gets the assigned BabyId of the user
      useEffect(()=> {

        const fetchAssignedBaby = async() => {

            try{
                const response = await axios.get(`${BACKEND_URL}/baby/user/${userId}`, {
                })

                console.log("Current BabyId", response.data.id);
                localStorage.setItem('babyId', response.data.id)

            }catch(error){
                console.error("error fetching assigned baby", error)
            }
        }
        fetchAssignedBaby();
    });


    const handleNaptimeClick = async () => {

        const currentBabyId = localStorage.getItem('babyId')
        try{
            const createNapTimeDto = {
                date: new Date().toISOString(),
                userId: userId, 
                babyId: currentBabyId,
            }
        
            const response = await axios.post(`${BACKEND_URL}/naptime/create`, createNapTimeDto);
            console.log("Created object", response);
            alert("Nap Time Recorded!")


        }catch(error){
            console.error("There was an error", error)
        }
    };
    const handleDiaperTimeClick = async () => {

        const currentBabyId = localStorage.getItem('babyId')
        try{
            const createDiapertimeDto = {
                date: new Date().toISOString(),
                userId: userId, 
                babyId: currentBabyId,
            }
        
            const response = await axios.post(`${BACKEND_URL}/diapertime/create`, createDiapertimeDto);
            console.log("Created object", response);
            alert("Diaper Time Recorded!")

        }catch(error){
            console.error("There was an error", error)
        }
    };


    const handleFeedTimeClick = async () => {

        const currentBabyId = localStorage.getItem('babyId')
        try{
            const createFeedTimeDto = {
                date: new Date().toISOString(),
                userId: userId, 
                babyId: currentBabyId,
            }
        
            const response = await axios.post(`${BACKEND_URL}/feedtime/create`, createFeedTimeDto);
            console.log("Created object", response);
            alert("Feed Time Recorded!");


        }catch(error){
            console.error("There was an error", error)
        }
    };


    
  

    return (
        <div>
            <h2>Ready to log for Baby Axel</h2>
            <button className="naptime-button" onClick={handleNaptimeClick}>
                <img src="../assets/naptime.png" alt="nap-button"></img>
                Nap Time</button>
            <button className="diapertime-button" onClick={handleDiaperTimeClick}>Diaper Time</button>
            <button className="feedtime-button" onClick={handleFeedTimeClick}>Feed Time</button>
            {/* <button onClick={handleClick}>Bath Time</button> */}
        </div>
    );
};

export default AddSched;
