import React from "react";
import axios from "axios";

const AddSched: React.FC = () => {
    const handleClick = async () => {


        const userId = localStorage.getItem("userId")
        try{
            const createNapTimeDto = {
                date: new Date().toISOString(),
                userId: userId, 
                babyId: 11,
            }
        
            const response = await axios.post('http://localhost:3000/naptime/create', createNapTimeDto);
            console.log("Created object", response);

        }catch(error){
            console.error("There was an error", error)
        }
    };


    return (
        <div>
            <h2>Ready to log for Baby Axel</h2>
            <button onClick={handleClick}>Sleepy Time</button>
            <button onClick={handleClick}>Diaper Time</button>
            <button onClick={handleClick}>Tummy Time</button>
            <button onClick={handleClick}>Bath Time</button>
        </div>
    );
};

export default AddSched;
