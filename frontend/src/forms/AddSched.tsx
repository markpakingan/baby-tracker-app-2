import React, { useEffect } from "react";
import axios from "axios";
import "./AddSched.css";
import napTimeImage from "../assets/naptime.png";
import diaperTimeImage from "../assets/diapertime.png";
import feedTimeImage from "../assets/feeding time.png"

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
    <div className="button-container">
        <button className="naptime-button" onClick={handleNaptimeClick}>
            <img className="naptime-icon" src={napTimeImage} alt="Nap Time" />
            Nap Time
        </button>
        <button className="diapertime-button" onClick={handleDiaperTimeClick}>
            <img className="diapertime-icon" src={diaperTimeImage} alt="Diaper Time" />
            Diaper Time
        </button>
        <button className="feedtime-button" onClick={handleFeedTimeClick}>
            <img className="feedtime-icon" src={feedTimeImage} alt="Feed Time" />
            Feed Time
        </button>
    </div>
</div>
    );
};

export default AddSched;
