import React, {useState, ChangeEvent, FormEvent} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBabyForm = () => {

    const storedUserId = localStorage.getItem('userId')
    const navigate = useNavigate();
    const initialState = {
        name: "", 
        gender: "", 
        dateOfBirth: "", 
        userId: storedUserId
    }

    const BACKEND_URL  = "http://localhost:3000";
    const [ formData, setFormData] = useState(initialState)

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${BACKEND_URL}/baby/create`, formData);
            setFormData(initialState);
            alert("Baby Created!");
            navigate('/dashboard')

            console.log(
                {
                    status: "Ok",
                    message: "Login successful",
                    data: response
                }
            ) 


            
        }catch(error){
            console.error(error)
        }
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>


                <label htmlFor="name"></label>
                <input
                    id = "name"
                    type= "text"
                    name = "name"
                    placeholder="Baby's first name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label htmlFor="dateOfBirth"></label>
                <input
                    id = "dateOfBirth"
                    type= "text"
                    name = "dateOfBirth"
                    placeholder="Birth Date MM/DD/YYY"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                />


                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>

                <button>Submit</button>
                
            </form>


        </div>

    )


}

export default AddBabyForm;