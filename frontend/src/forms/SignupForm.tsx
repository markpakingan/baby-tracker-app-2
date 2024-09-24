import React, {ChangeEvent, FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignUpForm = () => {
    const initialState = {
        username: "", 
        password: "", 
        firstname: "",
        lastname: "", 
        email: ""
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
            const response = await axios.post(`${BACKEND_URL}/user/create`, formData);
            setFormData(initialState);
            alert("Account Created, Please Log in to Continue");
            navigate("/login")
            return {
                status: "Ok",
                message: "Login successful",
                data: response
            }

            // alert(`the username is ${formData.username}, 
            //     pw is ${formData.password}, 
            //     firstname is ${formData.firstname}, 
            //     lastname is ${formData.lastname},
            //     email is ${formData.email}`)


        }catch(error){
            console.error(error)
        }
    }


    return(
        <div>

            <h1 className="website-title">The Bath App</h1>
            <div className="logo"></div>
            <h2>Baby Tracker App</h2> 

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

                <label htmlFor="password"></label>
                <input
                    id = "password"
                    type= "password"
                    name = "password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    id = "firstname"
                    type= "text"
                    name = "firstname"
                    placeholder="first name"
                    value={formData.firstname}
                    onChange={handleChange}
                />

                <input
                    id = "lastname"
                    type= "text"
                    name = "lastname"
                    placeholder="last name"
                    value={formData.lastname}
                    onChange={handleChange}
                />

                <input
                    id = "email"
                    type= "text"
                    name = "email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <button>Sign Up</button>

            </form>

            <a href="/login">Already Have An Account? LOGIN</a>
            
        </div>

    )
}

export default SignUpForm;