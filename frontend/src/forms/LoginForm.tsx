import React, {useState, ChangeEvent, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogInForm = () => {


    const initialState = {
        username: "", 
        password: ""
    }

    const BACKEND_URL  = "http://localhost:3000";
    const navigate = useNavigate();
    const [ formData, setFormData] = useState(initialState)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target; 
        setFormData(formData => ({
            ...formData, 
            [name]: value
        }))
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${BACKEND_URL}/auth/login`, formData);
            const token = response.data.access_token;
            const userId = response.data.userId;

            localStorage.setItem("token", token);
            localStorage.setItem("username", formData.username);
            localStorage.setItem("userId", userId);


            setFormData(initialState);
            alert("Login Authenticated!");

            navigate("/dashboard");

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

                <label htmlFor="username"></label>
                <input
                    id = "username"
                    type= "text"
                    name = "username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    id = "password"
                    type= "text"
                    placeholder="password"
                    name = "password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button>Log In</button>
                
            </form>

            <a href="/signup"><p>New User? Click The Sign Up</p></a>

        </div>

    )
}

export default LogInForm;